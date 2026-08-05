/**
 * Installer, AI Generator & Marketplace Test Suite
 * @module tools/installer/tests/installer.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import { MarketplaceRegistryEngine } from '../../marketplace/marketplace-engine';
import { AiStoreGeneratorEngine } from '../ai-generator';
import { SynoStoreInstaller } from '../installer-engine';
import { PlatformUpdateEngine } from '../update-engine';

test('Installer Platform: Store Provisioning & AI Generator', async (t) => {
  const installer = new SynoStoreInstaller();
  const aiGen = new AiStoreGeneratorEngine();
  const marketplace = new MarketplaceRegistryEngine();
  const updater = new PlatformUpdateEngine();

  await t.test('Executes automated store installation under 5 seconds', async () => {
    const res = await installer.installStore({
      storeId: 'store_fashion_001',
      storeName: 'Aura Fashion',
      industry: 'FASHION',
      database: 'POSTGRESQL',
      paymentGateway: 'STRIPE',
      deploymentTarget: 'VERCEL',
    });

    assert.equal(res.status, 'SUCCESS');
    assert.ok(res.installationTimeMs < 5000);
    assert.equal(res.themeAssigned, 'fashion-luxury-theme');
  });

  await t.test('Parses natural language prompt and generates store spec via AI Generator', () => {
    const spec = aiGen.generateFromPrompt('Create a luxury Ayurvedic store');
    assert.equal(spec.industry, 'Ayurveda');
    assert.equal(spec.themeColors.primary, '#0D3B2E');
    assert.equal(spec.suggestedProducts.length, 2);
  });

  await t.test('Registers marketplace plugin package and verifies SHA-256 integrity', () => {
    const pkg = marketplace.registerPackage({
      packageId: 'pkg_stripe_adapter',
      name: 'Stripe Gateway Adapter',
      version: '1.0.0',
      category: 'PAYMENT_ADAPTER',
      author: 'SynoStack Team',
    });

    assert.equal(pkg.isVerified, true);
    assert.ok(pkg.checksum.length > 0);
  });

  await t.test('Checks for updates, runs migrations, and executes rollback', () => {
    const updateInfo = updater.checkForUpdates('0.9.0');
    assert.equal(updateInfo.updateAvailable, true);

    const migrations = updater.runMigrations('0.9.0', '1.0.0-rc1');
    assert.equal(migrations.length, 2);

    const rollbackRes = updater.rollback('mig_001_db_schema');
    assert.equal(rollbackRes.success, true);
  });
});
