/**
 * Enterprise Omnichannel Retail & POS Platform Test Suite
 * @module modules/omnichannel/tests/omnichannel.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PosRegisterEngine,
  StoreInventorySyncEngine,
  OmnichannelFulfillmentEngine,
  UnifiedLoyaltyEngine,
} from '../index';

test('Enterprise Omnichannel Retail & POS Platform', async (t) => {
  const pos = new PosRegisterEngine();
  const inventory = new StoreInventorySyncEngine();
  const fulfillment = new OmnichannelFulfillmentEngine();
  const loyalty = new UnifiedLoyaltyEngine();

  await t.test('Opens/closes POS register session and syncs queued offline orders', () => {
    const reg = pos.openRegister('reg_bhilai_01', 'store_bhilai_center', 'staff_vaidya_01', 5000);
    assert.equal(reg.status, 'OPEN');

    const offlineOrder = pos.recordOfflineOrder('reg_bhilai_01', 'store_bhilai_center', ['KAL-HAIR-001'], 1200);
    assert.equal(offlineOrder.syncStatus, 'QUEUED');

    const syncRes = pos.syncOfflineQueue();
    assert.equal(syncRes.syncedCount, 1);
    assert.equal(syncRes.pendingCount, 0);

    const closedReg = pos.closeRegister('reg_bhilai_01', 6200);
    assert.equal(closedReg.status, 'CLOSED');
  });

  await t.test('Transfers multi-location stock between Bhilai Bhavan and Raipur Hub', () => {
    inventory.registerStoreLocation('store_bhilai', 'Bhilai Bhavan', 'Bhilai', 'Chhattisgarh', { 'KAL-SKIN-002': 100 });
    inventory.registerStoreLocation('store_raipur', 'Raipur Hub', 'Raipur', 'Chhattisgarh', { 'KAL-SKIN-002': 20 });

    const transferRes = inventory.transferStockBetweenStores('store_bhilai', 'store_raipur', 'KAL-SKIN-002', 30);
    assert.equal(transferRes.success, true);
    assert.equal(transferRes.sourceRemaining, 70);
    assert.equal(transferRes.targetTotal, 50);
  });

  await t.test('Creates Buy Online Pickup In Store (BOPIS) & Ship From Store fulfillments', () => {
    const bopis = fulfillment.createBopisFulfillment('ORD-2026-8801', 'store_bhilai');
    assert.equal(bopis.fulfillmentMode, 'BOPIS');
    assert.equal(bopis.status, 'PENDING_PICKUP');
    assert.ok(bopis.pickupCode && bopis.pickupCode.length === 6);

    const sfs = fulfillment.createShipFromStore('ORD-2026-8802', 'store_raipur');
    assert.equal(sfs.fulfillmentMode, 'SHIP_FROM_STORE');
    assert.equal(sfs.status, 'SHIPPED');
  });

  await t.test('Awards omnichannel purchase loyalty points and promotes customer tier', () => {
    const profile = loyalty.awardPurchasePoints('cust_shivam_213', 6000); // 600 points
    assert.equal(profile.pointsBalance, 600);
    assert.equal(profile.tier, 'SILVER');
  });
});
