/**
 * Enterprise API Platform & Developer Portal Test Suite
 * @module modules/api-platform/tests/api-platform.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ApiGatewayEngine,
  OpenApiGeneratorEngine,
  WebhookDeliveryEngine,
  SdkGeneratorEngine,
} from '../index';

test('Enterprise API Platform & Developer Portal', async (t) => {
  const gateway = new ApiGatewayEngine();
  const openapi = new OpenApiGeneratorEngine();
  const webhooks = new WebhookDeliveryEngine();
  const sdk = new SdkGeneratorEngine();

  await t.test('Validates API key credentials, scopes, and enforces rate limit throttling', () => {
    const keyRecord = gateway.createApiKey('client_acme_dev', ['read:catalog'], 2);

    const validReq = gateway.validateRequest(keyRecord.apiKey, 'read:catalog');
    assert.equal(validReq.allowed, true);

    const missingScopeReq = gateway.validateRequest(keyRecord.apiKey, 'write:orders');
    assert.equal(missingScopeReq.allowed, false);
    assert.ok(missingScopeReq.reason?.includes('Missing required scope'));

    gateway.validateRequest(keyRecord.apiKey, 'read:catalog'); // 2nd request
    const rateLimitedReq = gateway.validateRequest(keyRecord.apiKey, 'read:catalog'); // 3rd request (exceeds limit 2)
    assert.equal(rateLimitedReq.allowed, false);
    assert.ok(rateLimitedReq.reason?.includes('Rate limit exceeded'));
  });

  await t.test('Generates OpenAPI 3.1 JSON spec & Postman Collection schema', () => {
    const spec = openapi.generateOpenApi31Spec();
    assert.equal(spec.openapi, '3.1.0');
    assert.ok(spec.paths['/v1/products']);

    const postman = openapi.generatePostmanCollection();
    assert.equal(postman.info.name, 'SynoCommerce API v1');
  });

  await t.test('Dispatches webhook with HMAC SHA-256 signature and replays event', () => {
    const ep = webhooks.registerWebhookEndpoint('client_acme_dev', 'https://api.acme.com/webhooks', ['order.created']);
    assert.ok(ep.secret.startsWith('whsec_'));

    const delivery = webhooks.dispatchWebhookEvent(ep.endpointId, 'order.created', { orderId: 'ORD-2026-1001' });
    assert.equal(delivery.status, 'DELIVERED');
    assert.ok(delivery.signature.length > 0);

    const replayed = webhooks.replayWebhookEvent(delivery.deliveryId);
    assert.equal(replayed.status, 'REPLAYED');
    assert.equal(replayed.attempts, 2);
  });

  await t.test('Generates multi-language SDK generator metadata', () => {
    const tsSdk = sdk.generateSdkMetadata('typescript');
    assert.equal(tsSdk.packageName, '@synocommerce/sdk-typescript');

    const pythonSdk = sdk.generateSdkMetadata('python');
    assert.equal(pythonSdk.packageName, '@synocommerce/sdk-python');
  });
});
