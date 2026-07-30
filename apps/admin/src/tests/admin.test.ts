/**
 * Admin Platform Integration & View Tests
 * @module apps/admin/src/tests/admin.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CUSTOMERS, INITIAL_PLUGINS } from '../lib/data-store';
import { formatCurrency } from '../lib/utils';

test('Admin Platform Data Store & Utilities', async (t) => {
  await t.test('Verifies initial product catalog dataset', () => {
    assert.equal(INITIAL_PRODUCTS.length, 5);
    assert.equal(INITIAL_PRODUCTS[0]?.sku, 'AUDIO-HP-001');
    assert.equal(INITIAL_PRODUCTS[0]?.status, 'PUBLISHED');
  });

  await t.test('Verifies initial orders dataset and currency formatting', () => {
    assert.equal(INITIAL_ORDERS.length, 4);
    assert.equal(formatCurrency(149.50), '$149.50');
  });

  await t.test('Verifies initial customer and plugin datasets', () => {
    assert.equal(INITIAL_CUSTOMERS.length, 4);
    assert.equal(INITIAL_PLUGINS.length, 5);
    const enabledPlugins = INITIAL_PLUGINS.filter((p) => p.status === 'ENABLED');
    assert.equal(enabledPlugins.length, 4);
  });
});
