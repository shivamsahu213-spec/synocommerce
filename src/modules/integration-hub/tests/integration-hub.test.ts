/**
 * Enterprise Integration Hub Test Suite
 * @module modules/integration-hub/tests/integration-hub.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CrmConnectorEngine,
  ErpConnectorEngine,
  MarketplaceLogisticsConnectorEngine,
  SyncEngineProcessor,
} from '../index';

test('Enterprise Integration Hub: Sync Engine & System Connectors', async (t) => {
  const syncEngine = new SyncEngineProcessor();
  const erp = new ErpConnectorEngine();
  const crm = new CrmConnectorEngine();
  const channels = new MarketplaceLogisticsConnectorEngine();

  await t.test('Executes bidirectional sync job and resolves conflict using ERP_MASTER rule', () => {
    const job = syncEngine.createSyncJob('SAP_S4HANA', 'SynoCommerce');
    assert.equal(job.status, 'COMPLETED');
    assert.equal(job.recordsProcessed, 120);

    const conflict = syncEngine.resolveConflict('SAP_Stock_500', 'Commerce_Stock_450', 'ERP_MASTER');
    assert.equal(conflict.winningValue, 'SAP_Stock_500');
  });

  await t.test('Pushes failed webhook payload to Dead Letter Queue (DLQ) and retries processing', () => {
    const dlq = syncEngine.pushToDlq('job_sap_1001', { sku: 'KAL-HAIR-001' }, 'ERP connection timeout');
    assert.ok(dlq.dlqId.startsWith('dlq_'));
    assert.equal(dlq.retryAttempts, 1);

    const retryRes = syncEngine.retryDlqItem(dlq.dlqId);
    assert.equal(retryRes.success, true);
  });

  await t.test('Synchronizes 4,500 inventory SKUs from SAP S/4HANA ERP', async () => {
    const res = await erp.syncStockFromErp('SAP_S4HANA');
    assert.equal(res.system, 'SAP_S4HANA');
    assert.equal(res.skusSyncedCount, 4500);
  });

  await t.test('Synchronizes customer account and sales opportunity to Salesforce CRM', async () => {
    const customerRes = await crm.syncCustomerAccount('SALESFORCE', 'acme@example.com');
    assert.equal(customerRes.status, 'SYNCED');

    const oppRes = await crm.syncSalesOpportunity('SALESFORCE', 50000);
    assert.ok(oppRes.opportunityId.includes('SALESFORCE_OPP_50000'));
  });

  await t.test('Imports multi-channel orders from Amazon & exports waybill to Shiprocket', async () => {
    const importRes = await channels.importChannelOrders('AMAZON');
    assert.equal(importRes.importedOrdersCount, 85);

    const waybill = await channels.exportWaybillToLogistics('SHIPROCKET', 'ORD-2026-9901');
    assert.ok(waybill.trackingNumber.includes('SHIPROCKET'));
  });
});
