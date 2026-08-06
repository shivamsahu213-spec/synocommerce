/**
 * Enterprise Marketplace & Extension Platform Test Suite
 * @module src/modules/extensions/tests/extensions.test
 */

import assert from 'node:assert/strict';
import test from 'node:test';

import {
  BillingEngineProcessor,
  ExtensionAnalyticsProcessor,
  ExtensionSdk,
  MarketplaceEngineProcessor,
  PermissionEngineProcessor,
  PluginEngineProcessor,
  PluginSigningEngine,
  PluginValidatorProcessor,
  PublisherPortalProcessor,
  SandboxEngineProcessor,
  SynoPackage,
  ThemeEngineProcessor,
} from '../index';

test('Enterprise Marketplace & Extension Ecosystem Platform', async (t) => {
  const signingEngine = new PluginSigningEngine();
  const validator = new PluginValidatorProcessor();
  const sandbox = new SandboxEngineProcessor();
  const permissions = new PermissionEngineProcessor();
  const pluginEngine = new PluginEngineProcessor();
  const sdk = new ExtensionSdk();
  const themeEngine = new ThemeEngineProcessor();
  const marketplace = new MarketplaceEngineProcessor();
  const publisherPortal = new PublisherPortalProcessor();
  const billing = new BillingEngineProcessor();
  const analytics = new ExtensionAnalyticsProcessor();

  const sampleDistCode = 'console.log("Shiprocket Plugin Initialized");';
  const publisherId = 'Shiprocket Inc.';
  const sig = signingEngine.signPackage(sampleDistCode, publisherId);
  const checksum = signingEngine.generateChecksum(sampleDistCode);

  const samplePkg: SynoPackage = {
    packageId: 'pkg_shiprocket_v1',
    manifest: {
      pluginId: 'plugin_shiprocket',
      name: 'Shiprocket Shipping',
      version: '1.0.0',
      author: 'Shiprocket Devs',
      publisher: publisherId,
      license: 'MIT',
      description: 'Multi-carrier logistics integration',
      category: 'SHIPPING',
      permissions: ['read:orders', 'write:fulfillments'],
      dependencies: {},
      minPlatformVersion: '1.0.0',
      entryPoint: 'dist/index.js',
    },
    signatureSig: sig,
    checksumSha256: checksum,
    distCode: sampleDistCode,
  };

  await t.test('Verifies package digital signature and SHA-256 integrity', () => {
    const valid = signingEngine.verifyPackageSignature(samplePkg);
    assert.equal(valid, true);
  });

  await t.test('Validates manifest structure and platform version compatibility', () => {
    const valRes = validator.validateManifest(samplePkg.manifest);
    assert.equal(valRes.valid, true);

    const isCompat = validator.isCompatible(samplePkg.manifest, '1.0.0');
    assert.equal(isCompat, true);
  });

  await t.test('Installs, disables, enables, updates, and rolls back plugin lifecycle', () => {
    const installed = pluginEngine.installPlugin(samplePkg);
    assert.equal(installed.state, 'ACTIVE');

    const disabled = pluginEngine.disablePlugin('plugin_shiprocket');
    assert.equal(disabled.state, 'DISABLED');

    const enabled = pluginEngine.enablePlugin('plugin_shiprocket');
    assert.equal(enabled.state, 'ACTIVE');

    // Update Plugin
    const samplePkgV2: SynoPackage = {
      ...samplePkg,
      manifest: { ...samplePkg.manifest, version: '1.1.0' },
      signatureSig: signingEngine.signPackage(sampleDistCode, publisherId),
    };

    const updated = pluginEngine.updatePlugin(samplePkgV2);
    assert.equal(updated.version, '1.1.0');
    assert.equal(updated.previousVersion, '1.0.0');

    // Rollback Plugin
    const rolledBack = pluginEngine.rollbackPlugin('plugin_shiprocket');
    assert.equal(rolledBack.version, '1.0.0');
  });

  await t.test('Executes third-party plugin code within isolated Sandbox runtime', async () => {
    const res = await sandbox.executeInSandbox('plugin_shiprocket', () => {
      return { status: 'SHIPMENT_CREATED', waybill: 'WB-99123' };
    });

    assert.equal(res.success, true);
    assert.equal(res.output.waybill, 'WB-99123');
  });

  await t.test('Authorizes OAuth permission scopes and enforces tenant isolation', () => {
    const hasPerm = permissions.authorizePermission(['read:orders', 'write:fulfillments'], 'read:orders');
    assert.equal(hasPerm, true);

    const isIsolated = permissions.validateStoreTenantIsolation('store_101', 'tenant_acme', 'tenant_acme');
    assert.equal(isIsolated, true);
  });

  await t.test('Registers Developer SDK hooks and payment extensions', async () => {
    sdk.registerPaymentExtension('razorpay', async (payload: any) => {
      return { ...payload, processedBy: 'Razorpay' };
    });

    const result = (await sdk.executeHooks('payment:razorpay', { amount: 100 })) as any;
    assert.equal(result.processedBy, 'Razorpay');
  });

  await t.test('Installs and previews storefront theme packages', () => {
    const theme = themeEngine.installTheme({
      themeId: 'theme_luxury_ayurveda',
      name: 'Luxury Ayurveda Theme',
      version: '1.0.0',
      author: 'Kalyan Devs',
      primaryColor: '#059669',
      accentColor: '#D97706',
    });

    assert.equal(theme.themeId, 'theme_luxury_ayurveda');

    const preview = themeEngine.previewTheme(theme);
    assert.ok(preview.includes('Luxury Ayurveda Theme'));
  });

  await t.test('Searches Marketplace listings by query and category filter', () => {
    const shippingApps = marketplace.searchListings('Shiprocket', 'SHIPPING');
    assert.equal(shippingApps.length, 1);
    assert.equal(shippingApps[0]?.publisher, 'Shiprocket Inc.');
  });

  await t.test('Submits app packages via Publisher Portal', () => {
    const subRes = publisherPortal.submitApp({
      publisherId,
      pkg: samplePkg,
      priceMonthlyUsd: 29,
      supportEmail: 'support@shiprocket.com',
      privacyPolicyUrl: 'https://shiprocket.com/privacy',
      documentationUrl: 'https://shiprocket.com/docs',
    });

    assert.equal(subRes.status, 'APPROVED');
  });

  await t.test('Calculates 80/20 Marketplace revenue sharing subscription billing', () => {
    const sub = billing.createSubscription('tenant_acme', 'plugin_shiprocket', 100);
    assert.equal(sub.priceMonthlyUsd, 100);
    assert.equal(sub.revenueSharePublisherUsd, 80);
    assert.equal(sub.revenueSharePlatformUsd, 20);
  });

  await t.test('Fetches Marketplace app analytics and telemetry', () => {
    const stats = analytics.getAppAnalytics('plugin_shiprocket');
    assert.equal(stats.totalInstalls, 4500);
    assert.ok(stats.monthlyRevenueUsd > 0);
  });
});
