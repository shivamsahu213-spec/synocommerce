/**
 * Enterprise Migration Toolkit Test Suite
 * @module src/modules/migration/tests/migration.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { SynoMigrationEngine } from '../migration-engine';

test('Enterprise Migration Toolkit Engine', async (t) => {
  const engine = new SynoMigrationEngine();

  await t.test('Creates migration job with SHA-256 checksum validation', () => {
    const rawPayload = JSON.stringify([{ product_name: 'Ayurvedic Oil', sku: 'SKU_OIL_01', price: 15.0 }]);
    const job = engine.createMigrationJob('SHOPIFY', rawPayload);

    assert.equal(job.sourcePlatform, 'SHOPIFY');
    assert.ok(job.checksumSha256);
  });

  await t.test('Validates records and detects missing fields or duplicate SKUs', () => {
    const invalidRecords = [
      { name: 'Triphala Juice', sku: 'SKU_01' },
      { name: 'Ashwagandha', sku: 'SKU_01' }, // Duplicate SKU
      { price: 20 }, // Missing product name
    ];

    const valResult = engine.validateRecords(invalidRecords);
    assert.equal(valResult.valid, false);
    assert.equal(valResult.errors.length, 2);
  });

  await t.test('Executes import pipeline and updates job progress metrics', async () => {
    const rawPayload = JSON.stringify([{ product_name: 'Juice 1', price: 10 }]);
    const job = engine.createMigrationJob('WOOCOMMERCE', rawPayload);

    const validRecords = [
      { product_name: 'Kalyan Triphala Juice 1L', sku: 'SKU_TRIPHALA_01', priceUsd: 12.5 },
      { product_name: 'Kalyan Ashwagandha Tablets', sku: 'SKU_ASHWA_01', priceUsd: 18.0 },
    ];

    const progress = await engine.executeImportJob(job, validRecords);
    assert.equal(progress.importedRecords, 2);
    assert.equal(progress.failedRecords, 0);
    assert.equal(progress.progressPercentage, 100);
  });

  await t.test('Executes full snapshot rollback for an imported job', async () => {
    const rawPayload = JSON.stringify([{ product_name: 'Item 1', price: 10 }]);
    const job = engine.createMigrationJob('MAGENTO_2', rawPayload);
    await engine.executeImportJob(job, [{ product_name: 'Test Product', price: 10 }]);

    const rollbackResult = engine.rollbackMigration(job.jobId);
    assert.equal(rollbackResult.rolledBack, true);
    assert.equal(rollbackResult.deletedCount, 1);

    const updatedProgress = engine.getJobProgress(job.jobId);
    assert.equal(updatedProgress?.status, 'ROLLED_BACK');
  });
});
