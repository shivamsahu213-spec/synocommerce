/**
 * Enterprise Mobile SDK Platform Test Suite
 * @module sdk/mobile/tests/mobile-sdk.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SynoMobileSDK,
  SynoAndroidSDK,
  SynoiOSSDK,
  SynoFlutterSDK,
  SynoReactNativeSDK,
} from '../index';

test('Enterprise Mobile SDK Platform', async (t) => {
  const sdk = new SynoMobileSDK({
    apiKey: 'syno_m_test_key',
    storeId: 'store_test_01',
    enableOfflineCache: true,
    certificatePinningHashes: ['pin_hash_sha256_valid'],
  });

  await t.test('Authenticates guest session and issues JWT token', async () => {
    const auth = await sdk.loginGuest();
    assert.equal(auth.isGuest, true);
    assert.ok(auth.accessToken.startsWith('m_guest_token_'));
  });

  await t.test('Adds items to mobile cart and calculates tax & total USD', async () => {
    const cart = await sdk.addToCart('prod_triphala_101', 'Triphala Juice 1L', 2, 12.5);
    assert.equal(cart.items.length, 1);
    assert.equal(cart.subtotalUsd, 25.0);
    assert.equal(cart.taxUsd, 2.0); // 8% tax
    assert.equal(cart.totalUsd, 27.0);
  });

  await t.test('Tracks mobile analytics events', () => {
    sdk.trackEvent('SCREEN_VIEW', { screen: 'ProductDetailScreen' });
    const events = sdk.getAnalyticsEvents();
    assert.ok(events.length >= 2); // Includes ADD_TO_CART + SCREEN_VIEW
  });

  await t.test('Manages offline action queue and sync processing', async () => {
    sdk.offlineEngine.enqueueAction('ADD_TO_CART', { productId: 'prod_ashwa' });
    assert.equal(sdk.offlineEngine.getQueueLength(), 1);

    const syncRes = await sdk.offlineEngine.processSyncQueue();
    assert.equal(syncRes.syncedCount, 1);
    assert.equal(sdk.offlineEngine.getQueueLength(), 0);
  });

  await t.test('Verifies certificate pinning and device trust security', () => {
    const isCertValid = sdk.securityEngine.verifyCertificatePinning('pin_hash_sha256_valid');
    assert.equal(isCertValid, true);

    const trustResult = sdk.securityEngine.verifyDeviceTrust('dev_id_101', false);
    assert.equal(trustResult.trusted, true);

    const jailbrokenResult = sdk.securityEngine.verifyDeviceTrust('dev_id_102', true);
    assert.equal(jailbrokenResult.trusted, false);
    assert.equal(jailbrokenResult.reason, 'DEVICE_JAILBROKEN_OR_ROOTED');
  });

  await t.test('Validates platform wrappers for Android, iOS, Flutter, and React Native', () => {
    const android = new SynoAndroidSDK({ apiKey: 'k', storeId: 's' });
    const ios = new SynoiOSSDK({ apiKey: 'k', storeId: 's' });
    const flutter = new SynoFlutterSDK({ apiKey: 'k', storeId: 's' });
    const rn = new SynoReactNativeSDK({ apiKey: 'k', storeId: 's' });

    assert.equal(android.initializeAndroidKeystore(), true);
    assert.equal(ios.initializeKeychainSecureEnclave(), true);
    assert.equal(flutter.initializePlatformChannel(), true);
    assert.equal(rn.initializeExpoSecureStore(), true);
  });
});
