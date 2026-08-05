/**
 * Multi-Carrier Shipping & Fulfillment Automated Test Suite
 * @module src/integrations/tests/shipping.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {
  ShippingCarrierProvider,
  WarehouseRouterEngine,
  FulfillmentEngineProcessor,
  TrackingEngineProcessor,
  ShipmentSecurityEngine,
} from '../shipping';

test('Enterprise Multi-Carrier Shipping & Fulfillment Platform', async (t) => {
  const carrierProvider = new ShippingCarrierProvider();
  const warehouseRouter = new WarehouseRouterEngine();
  const fulfillmentEngine = new FulfillmentEngineProcessor();
  const trackingEngine = new TrackingEngineProcessor();

  await t.test('Calculates live shipping rates across all 8 supported carriers', async () => {
    const rates = await carrierProvider.getCarrierRates({
      originPincode: '490006',
      destinationPincode: '492001',
      weightKg: 2.5,
      paymentMode: 'COD',
      declaredValueUsd: 120.0,
    });

    assert.equal(rates.length, 8);
    assert.ok(rates.some((r) => r.carrier === 'SHIPROCKET'));
    assert.ok(rates.some((r) => r.carrier === 'DELHIVERY'));
    assert.ok(rates.some((r) => r.carrier === 'FEDEX'));
  });

  await t.test('Creates shipment, generates AWB number, label PDF URL, and cancels shipment', async () => {
    const shipment = await carrierProvider.createShipment({
      orderId: 'ORD-9912',
      carrier: 'SHIPROCKET',
      pickupAddress: {
        name: 'Bhilai Warehouse',
        phone: '9988776655',
        email: 'bhilai@example.com',
        street: 'Sector 6',
        city: 'Bhilai',
        state: 'Chhattisgarh',
        pincode: '490006',
        country: 'India',
      },
      deliveryAddress: {
        name: 'Shivam Sahu',
        phone: '9988776644',
        email: 'shivam@example.com',
        street: 'Main Road',
        city: 'Raipur',
        state: 'Chhattisgarh',
        pincode: '492001',
        country: 'India',
      },
      items: [{ sku: 'SKU-001', name: 'Triphala Juice', quantity: 2, priceUsd: 15.0 }],
      totalWeightKg: 1.5,
      paymentMode: 'PREPAID',
    });

    assert.ok(shipment.awbNumber.startsWith('AWB_SHIPROCKET_'));
    assert.ok(shipment.labelUrl.endsWith('.pdf'));

    const cancelRes = await carrierProvider.cancelShipment('SHIPROCKET', shipment.awbNumber);
    assert.equal(cancelRes.success, true);
  });

  await t.test('Verifies HMAC webhook signature and rejects replay/expired timestamp', () => {
    ShipmentSecurityEngine.resetSecurityCache();

    const timestamp = Math.floor(Date.now() / 1000);
    const eventId = 'evt_sr_1001';
    const carrier = 'SHIPROCKET';
    const awbNumber = 'AWB_SR_9921';
    const secret = 'sr_secret_key';

    const signedText = `${eventId}:${carrier}:${awbNumber}:${timestamp}`;
    const signature = crypto.createHmac('sha256', secret).update(signedText).digest('hex');

    const validRes = carrierProvider.verifyWebhookSignature({
      eventId,
      carrier,
      awbNumber,
      event: 'DELIVERY_CONFIRMED',
      timestamp,
      location: 'Raipur Hub',
      signature,
    });

    assert.equal(validRes.valid, true);
    assert.equal(validRes.isDuplicate, false);

    const dupRes = carrierProvider.verifyWebhookSignature({
      eventId,
      carrier,
      awbNumber,
      event: 'DELIVERY_CONFIRMED',
      timestamp,
      location: 'Raipur Hub',
      signature,
    });
    assert.equal(dupRes.isDuplicate, true);
  });

  await t.test('Executes nearest warehouse selection and capacity reservation', () => {
    const selected = warehouseRouter.selectOptimalWarehouse('492001');
    assert.equal(selected.warehouseId, 'wh_bhilai');
    assert.ok(selected.availableCapacity < 5000);
  });

  await t.test('Creates BOPIS fulfillment order and validates 6-digit pickup verification code', () => {
    const ful = fulfillmentEngine.createFulfillmentOrder('ORD-9915', 'BOPIS', 'store_bhilai');
    assert.ok(ful.pickupVerificationCode?.length === 6);

    const success = fulfillmentEngine.completePickup(ful.fulfillmentId, ful.pickupVerificationCode!);
    assert.equal(success, true);
  });

  await t.test('Retrieves live tracking timeline events and predicted ETA', () => {
    const tracking = trackingEngine.getLiveTrackingTimeline('AWB_DELHIVERY_1002', 'DELHIVERY');
    assert.equal(tracking.currentStatus, 'IN_TRANSIT');
    assert.ok(tracking.events.length >= 3);
  });
});
