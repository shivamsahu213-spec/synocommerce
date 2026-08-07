/**
 * SynoCommerce Commerce Engine End-to-End & Integration Test Suite
 * @module modules/commerce-engine/tests/commerce-engine.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CartAggregate,
  CartEngine,
  CheckoutEngine,
  InventoryEngine,
  OrderEngine,
  PaymentEngine,
  PricingEngine,
  PromotionEngine,
  RecommendationEngine,
  ReturnEngine,
  SearchEngine,
  ShippingEngine,
  TaxEngine,
} from '../index';

test('Commerce Engine: Pricing & Currency Conversions', async (t) => {
  const pricing = new PricingEngine();
  pricing.setProductPrice({
    sku: 'AUDIO-HP-001',
    basePrice: 100.0,
    salePrice: 80.0,
    currency: 'USD',
    tiers: [{ minQuantity: 5, unitPrice: 70.0 }],
  });

  await t.test('Calculates unit price with sale discount', () => {
    const res = pricing.calculateUnitPrice('AUDIO-HP-001', 1, 'USD');
    assert.equal(res.unitPrice, 80.0);
    assert.equal(res.totalPrice, 80.0);
  });

  await t.test('Applies volume tier pricing when threshold quantity is met', () => {
    const res = pricing.calculateUnitPrice('AUDIO-HP-001', 5, 'USD');
    assert.equal(res.unitPrice, 70.0);
    assert.equal(res.totalPrice, 350.0);
  });

  await t.test('Converts price to target currency (EUR)', () => {
    const res = pricing.calculateUnitPrice('AUDIO-HP-001', 1, 'EUR');
    assert.equal(res.currency, 'EUR');
    assert.equal(res.unitPrice, 73.6); // 80 * 0.92 = 73.6
  });
});

test('Commerce Engine: Promotion Rules & Coupons', async (t) => {
  const promo = new PromotionEngine();
  promo.registerPromotion({ code: 'SUMMER15', type: 'PERCENTAGE', value: 15 });
  promo.registerPromotion({ code: 'SAVE20', type: 'FIXED_AMOUNT', value: 20, minSubtotal: 50 });
  promo.registerPromotion({ code: 'FREESHIP', type: 'FREE_SHIPPING', value: 0 });

  await t.test('Applies percentage discount coupon', () => {
    const res = promo.applyCoupon('SUMMER15', 100.0);
    assert.equal(res.discountAmount, 15.0);
  });

  await t.test('Applies fixed amount discount coupon', () => {
    const res = promo.applyCoupon('SAVE20', 100.0);
    assert.equal(res.discountAmount, 20.0);
  });

  await t.test('Enforces minimum subtotal rule', () => {
    assert.rejects(async () => {
      promo.applyCoupon('SAVE20', 30.0);
    }, /Subtotal must be at least \$50/);
  });
});

test('Commerce Engine: Inventory Allocation & Reservations', async (t) => {
  const inventory = new InventoryEngine();
  inventory.setInventory({
    sku: 'AUDIO-HP-001',
    warehouseId: 'WH-EAST',
    onHandQuantity: 50,
    reservedQuantity: 0,
    safetyStock: 5,
    allowBackorder: false,
  });

  await t.test('Calculates available stock minus safety stock', () => {
    const available = inventory.getAvailableStock('AUDIO-HP-001');
    assert.equal(available, 45);
  });

  await t.test('Reserves stock and updates availability', () => {
    const reservation = inventory.reserveStock('AUDIO-HP-001', 10);
    assert.ok(reservation.reservationId.startsWith('res_'));
    assert.equal(inventory.getAvailableStock('AUDIO-HP-001'), 35);

    inventory.releaseReservation(reservation.reservationId);
    assert.equal(inventory.getAvailableStock('AUDIO-HP-001'), 45);
  });
});

test('Commerce Engine: End-to-End Checkout & Order Lifecycle Workflow', async (t) => {
  const pricing = new PricingEngine();
  pricing.setProductPrice({ sku: 'AUDIO-HP-001', basePrice: 100.0, currency: 'USD' });

  const promo = new PromotionEngine();
  promo.registerPromotion({ code: 'SAVE10', type: 'FIXED_AMOUNT', value: 10.0 });

  const tax = new TaxEngine();
  const cartEngine = new CartEngine(pricing, promo, tax);

  const inventory = new InventoryEngine();
  inventory.setInventory({
    sku: 'AUDIO-HP-001',
    warehouseId: 'WH-MAIN',
    onHandQuantity: 100,
    reservedQuantity: 0,
    safetyStock: 0,
    allowBackorder: false,
  });

  const payment = new PaymentEngine();
  const orderEngine = new OrderEngine();
  const checkoutEngine = new CheckoutEngine(cartEngine, inventory, payment, orderEngine);

  await t.test('Executes full checkout workflow from Cart to Order Placement', async () => {
    // 1. Create Cart & Add Item
    const cart = new CartAggregate('cart_001', 'cust_john');
    const priceInfo = pricing.calculateUnitPrice('AUDIO-HP-001', 2);
    cart.addItem({
      sku: 'AUDIO-HP-001',
      name: 'Syno Pro Headphones',
      quantity: 2,
      unitPrice: priceInfo.unitPrice,
      totalPrice: priceInfo.totalPrice,
    });
    cart.applyCoupon('SAVE10');

    const totals = cartEngine.calculateTotals(cart, 'US-CA');
    assert.equal(totals.subtotal, 200.0);
    assert.equal(totals.discountTotal, 10.0);
    assert.equal(totals.shippingEstimate, 9.99);

    // 2. Start Checkout Session
    const session = checkoutEngine.startCheckout(cart, 'cust_john');
    assert.equal(session.step, 'SHIPPING');

    // 3. Set Shipping Address
    checkoutEngine.setShippingAddress(session.id, {
      fullName: 'John Doe',
      street: '123 Tech Way',
      city: 'San Francisco',
      postalCode: '94105',
      country: 'USA',
    });
    assert.equal(session.step, 'PAYMENT');

    // 4. Complete Checkout (Reserves inventory, processes payment, creates order)
    const order = await checkoutEngine.completeCheckout(session.id, cart, 'Stripe');

    assert.equal(order.status, 'PAID');
    assert.ok(order.orderNumber.startsWith('ORD-2026-'));
    assert.ok(order.paymentTransactionId!.startsWith('txn_cap_'));
    assert.equal(session.step, 'CONFIRMED');

    // Verify stock was deducted via reservation
    assert.equal(inventory.getAvailableStock('AUDIO-HP-001'), 98);
  });
});

test('Commerce Engine: Returns & RMA Refunds', async (t) => {
  const payment = new PaymentEngine();
  const returnEngine = new ReturnEngine(payment);

  await t.test('Processes RMA request and issues refund transaction', async () => {
    const rma = returnEngine.requestReturn('ord_100', 'AUDIO-HP-001', 1, 'Defective unit');
    assert.equal(rma.status, 'REQUESTED');

    const refundedRma = await returnEngine.approveAndRefund(rma.rmaNumber, 100.0, 'txn_cap_123');
    assert.equal(refundedRma.status, 'REFUNDED');
    assert.equal(refundedRma.refundAmount, 100.0);
  });
});

test('Commerce Engine: Search & Recommendation Engine', async (t) => {
  const search = new SearchEngine();
  search.indexProduct({ id: '1', sku: 'HP-1', name: 'Wireless Headphones', category: 'Audio', brand: 'SynoTech', price: 199.99, tags: ['wireless', 'bluetooth'] });
  search.indexProduct({ id: '2', sku: 'KB-1', name: 'Mechanical Keyboard', category: 'Accessories', brand: 'SynoTech', price: 149.99, tags: ['keyboard', 'rgb'] });

  await t.test('Searches by term and filters by category', () => {
    const results = search.search({ term: 'Headphones', category: 'Audio' });
    assert.equal(results.length, 1);
    assert.equal(results[0]?.sku, 'HP-1');
  });

  await t.test('Generates search autocomplete suggestions', () => {
    const suggestions = search.autocomplete('head');
    assert.deepEqual(suggestions, ['Wireless Headphones']);
  });
});
