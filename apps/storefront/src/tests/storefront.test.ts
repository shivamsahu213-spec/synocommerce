/**
 * Storefront Integration & Data Flow Test Suite
 * @module apps/storefront/src/tests/storefront.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { STOREFRONT_PRODUCTS, searchEngine, cartEngine, CartAggregate } from '../lib/commerce-client';
import { formatCurrency } from '../lib/utils';

test('Storefront Framework: Data Models & Commerce Engine Binding', async (t) => {
  await t.test('Verifies indexed storefront catalog dataset', () => {
    assert.equal(STOREFRONT_PRODUCTS.length, 4);
    const searchRes = searchEngine.search({ term: 'Headphones' });
    assert.equal(searchRes.length, 1);
    assert.equal(searchRes[0]?.sku, 'AUDIO-HP-001');
  });

  await t.test('Verifies currency formatting and cart calculations', () => {
    assert.equal(formatCurrency(299.99), '$299.99');
    const cart = new CartAggregate();
    cart.addItem({
      sku: 'AUDIO-HP-001',
      name: 'Syno Pro Wireless Headphones',
      quantity: 1,
      unitPrice: 299.99,
      totalPrice: 299.99,
    });
    const totals = cartEngine.calculateTotals(cart);
    assert.equal(totals.subtotal, 299.99);
    assert.ok(totals.grandTotal > 299.99); // Tax + Shipping
  });
});
