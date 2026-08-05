/**
 * Enterprise Marketplace Ecosystem Test Suite
 * @module src/modules/marketplace/tests/marketplace.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { SynoMarketplaceEngine } from '../marketplace-engine';

test('Enterprise Marketplace Ecosystem Engine', async (t) => {
  const engine = new SynoMarketplaceEngine();

  await t.test('Installs extension, updates version, and rolls back', () => {
    const inst = engine.installExtension('ext_razorpay_pro');
    assert.equal(inst.packageId, 'ext_razorpay_pro');
    assert.equal(inst.installedVersion, '1.4.0');

    const updated = engine.updateExtension('ext_razorpay_pro', '1.5.0');
    assert.equal(updated.installedVersion, '1.5.0');
    assert.equal(updated.previousVersion, '1.4.0');

    const rolledBack = engine.rollbackExtension('ext_razorpay_pro');
    assert.equal(rolledBack.installedVersion, '1.4.0');
  });

  await t.test('Verifies digital signature and SHA-256 payload integrity', () => {
    const payload = 'ext_payload_code_v1.4.0';
    const sig = crypto.createHash('sha256').update(payload).digest('hex');

    const isValid = engine.verifyDigitalSignature('ext_razorpay_pro', payload, sig);
    assert.equal(isValid, true);

    const isInvalid = engine.verifyDigitalSignature('ext_razorpay_pro', payload, 'invalid_sig');
    assert.equal(isInvalid, false);
  });

  await t.test('Scans package payload for malware and suspicious code', () => {
    const cleanScan = engine.scanForMalware('function calculateShipping() { return 10; }');
    assert.equal(cleanScan.clean, true);

    const maliciousScan = engine.scanForMalware('eval("alert(1)"); EICAR_TEST_FILE');
    assert.equal(maliciousScan.clean, false);
    assert.ok(maliciousScan.threatsDetected.length >= 1);
  });

  await t.test('Submits package ratings and reviews', () => {
    const rev = engine.submitReview('ext_razorpay_pro', 'Rajesh Merchant', 5, 'Flawless payment gateway setup!');
    assert.equal(rev.rating, 5);
    assert.equal(rev.author, 'Rajesh Merchant');
  });

  await t.test('Calculates 80/20 developer revenue sharing payout', () => {
    const payout = engine.calculatePublisherPayout(100.0);
    assert.equal(payout.publisherShareUsd, 80.0); // 80% developer
    assert.equal(payout.platformFeeUsd, 20.0); // 20% platform fee
  });
});
