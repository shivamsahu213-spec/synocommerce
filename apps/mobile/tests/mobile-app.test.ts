/**
 * Production Mobile Applications Test Suite
 * @module apps/mobile/tests/mobile-app.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AppNavigator,
  MobileNativeFeatures,
  MobileAppScreensController,
} from '../src';

test('Production Mobile Applications Platform', async (t) => {
  const navigator = new AppNavigator();
  const features = new MobileNativeFeatures();
  const controller = new MobileAppScreensController();

  await t.test('Navigates between screens and resolves deep links', () => {
    const nav1 = navigator.navigate('PRODUCT_LISTING');
    assert.equal(nav1, 'PRODUCT_LISTING');

    const deepLinkNav = navigator.handleDeepLink('syno://product/doc_101');
    assert.equal(deepLinkNav, 'PRODUCT_DETAILS');
  });

  await t.test('Authenticates user via Biometrics (Face ID)', async () => {
    const bioResult = await features.authenticateBiometrics();
    assert.equal(bioResult.success, true);
    assert.equal(bioResult.method, 'FACE_ID');
  });

  await t.test('Processes native mobile payments (Apple Pay & Google Pay)', async () => {
    const apay = await features.processApplePay(27.0);
    assert.equal(apay.success, true);
    assert.ok(apay.transactionId.startsWith('apay_'));

    const gpay = await features.processGooglePay(27.0);
    assert.equal(gpay.success, true);
    assert.ok(gpay.transactionId.startsWith('gpay_'));
  });

  await t.test('Scans QR & EAN-13 barcodes for product lookup', () => {
    const scan = features.scanQrOrBarcode('8901234567890');
    assert.equal(scan.barcode, '8901234567890');
    assert.equal(scan.format, 'EAN_13');
  });

  await t.test('Renders home screen and executes end-to-end checkout', async () => {
    const home = await controller.renderHomeScreen();
    assert.ok(home.featuredProducts.length >= 1);

    const orderRes = await controller.executeMobileCheckout('APPLE_PAY');
    assert.equal(orderRes.status, 'CONFIRMED');
    assert.ok(orderRes.orderId.startsWith('ORD_M_'));
  });
});
