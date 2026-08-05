/**
 * Enterprise Desktop POS Platform Test Suite
 * @module apps/desktop-pos/tests/desktop-pos.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { PosRegisterController } from '../src';

test('Enterprise Desktop POS Platform', async (t) => {
  const controller = new PosRegisterController();

  await t.test('Opens register session and kicks cash drawer solenoid', () => {
    const session = controller.openRegisterSession('REG_BHILAI_01', 'Rajesh Kumar', 150.0);
    assert.equal(session.status, 'OPEN');
    assert.equal(session.openingFloatUsd, 150.0);
  });

  await t.test('Verifies connected hardware drivers (Printer, Scanner, Drawer, Display, Scale)', () => {
    const devices = controller.hardwareManager.getConnectedDevices();
    assert.equal(devices.length, 5);

    const weight = controller.hardwareManager.readWeightScale();
    assert.equal(weight, 1.45);
  });

  await t.test('Processes split payment checkout (Cash + Credit Card)', () => {
    const items = [
      { sku: 'SKU_TRIPHALA', name: 'Triphala Juice 1L', quantity: 2, unitPriceUsd: 12.5, taxUsd: 2.0, subtotalUsd: 25.0 },
    ];
    const split = [
      { method: 'CASH' as const, amountUsd: 15.0 },
      { method: 'CARD' as const, amountUsd: 10.0 },
    ];

    const tx = controller.processCheckout(items, split, 20.0);
    assert.equal(tx.totalAmountUsd, 25.0);
    assert.equal(tx.status, 'COMPLETED');
    assert.ok(tx.transactionId.startsWith('TX_'));
  });

  await t.test('Generates mid-day X Report without closing session', () => {
    const xReport = controller.generateXZReport('X_REPORT');
    assert.equal(xReport.reportType, 'X_REPORT');
    assert.equal(xReport.grandTotalSalesUsd, 25.0);
    assert.equal(controller.getActiveSession()?.status, 'OPEN');
  });

  await t.test('Validates manager approval PIN override', () => {
    const approved = controller.authorizeManagerApproval('9912');
    assert.equal(approved, true);

    const rejected = controller.authorizeManagerApproval('0000');
    assert.equal(rejected, false);
  });

  await t.test('Manages offline POS transaction queue and server sync', async () => {
    const mockTx = {
      transactionId: 'TX_OFF_101',
      registerId: 'REG_01',
      cashierId: 'Rajesh',
      storeId: 'store_01',
      items: [],
      paymentSplit: [],
      totalAmountUsd: 50.0,
      changeDueUsd: 0,
      timestamp: new Date(),
      status: 'COMPLETED' as const,
    };

    controller.offlineSync.enqueueTransaction(mockTx);
    assert.equal(controller.offlineSync.getQueueLength(), 1);

    const syncRes = await controller.offlineSync.syncOfflineTransactions();
    assert.equal(syncRes.syncedCount, 1);
    assert.equal(controller.offlineSync.getQueueLength(), 0);
  });

  await t.test('Generates End of Day Z Report and closes register session', () => {
    const zReport = controller.generateXZReport('Z_REPORT');
    assert.equal(zReport.reportType, 'Z_REPORT');
    assert.equal(zReport.grandTotalSalesUsd, 25.0);
    assert.equal(controller.getActiveSession()?.status, 'CLOSED');
  });
});
