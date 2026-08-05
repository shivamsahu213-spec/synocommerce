/**
 * Production Readiness & Settings Verification Test Suite
 * @module infrastructure/tests/production-readiness.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import { ProductionSettingsManager } from '../config/production-settings';

test('Production Readiness Settings & Integration Credentials', async (t) => {
  await t.test('Resolves production service settings and default fallbacks', () => {
    const config = ProductionSettingsManager.getServicesConfig();
    assert.ok(config.databaseUrl.includes('postgresql://'));
    assert.ok(config.redisUrl.includes('redis://'));
    assert.ok(config.razorpayKeyId.length > 0);
    assert.ok(config.stripeSecretKey.length > 0);
    assert.ok(config.resendApiKey.length > 0);
    assert.ok(config.cloudinaryCloudName.length > 0);
    assert.ok(config.meilisearchHost.length > 0);
  });
});
