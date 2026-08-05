/**
 * Integration Platform Automated Test Suite
 * @module integrations/tests/integrations.test
 */

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import test from 'node:test';

import {
  EnterpriseCrmErpIntegrationPlatform,
  IdentityIntegrationPlatform,
  PaymentIntegrationPlatform,
  SearchIntegrationPlatform,
  ShippingIntegrationPlatform,
  TaxIntegrationPlatform,
  TelemetryMonitoringPlatform,
} from '../index';

test('Integration Platform: Payment Gateways & Webhooks', async (t) => {
  const payments = new PaymentIntegrationPlatform();

  await t.test('Authorizes payment via Stripe with HMAC signature verification', async () => {
    const res = await payments.authorize('STRIPE', { amount: 150.0, currency: 'USD' });
    assert.equal(res.gateway, 'STRIPE');
    assert.equal(res.status, 'AUTHORIZED');
    assert.ok(res.signature.length > 0);
  });

  await t.test('Verifies incoming webhook payload signature', () => {
    const secret = 'webhook_secret_key';
    const eventId = 'evt_stripe_1002';
    const signatureHeader = crypto.createHmac('sha256', secret).update(eventId).digest('hex');

    const isValid = payments.verifyWebhookSignature(
      { eventId, type: 'payment_intent.succeeded', data: {}, signatureHeader },
      secret
    );
    assert.equal(isValid, true);
  });
});

test('Integration Platform: Shipping Carriers & Tax Adapters', async (t) => {
  const shipping = new ShippingIntegrationPlatform();
  const tax = new TaxIntegrationPlatform();

  await t.test('Fetches live carrier rates across FedEx, UPS, and EasyPost', async () => {
    const rates = await shipping.getCarrierRates(100.0);
    assert.equal(rates.length, 4);
    assert.equal(rates[0]?.carrier, 'FEDEX');
  });

  await t.test('Calculates regional sales tax via Avalara adapter', async () => {
    const res = await tax.calculateTax('AVALARA', { subtotal: 100.0, country: 'US', regionCode: 'US-CA' });
    assert.equal(res.provider, 'AVALARA');
    assert.equal(res.taxAmount, 7.25);
  });
});

test('Integration Platform: CRM, ERP, Identity & Monitoring', async (t) => {
  const enterprise = new EnterpriseCrmErpIntegrationPlatform();
  const identity = new IdentityIntegrationPlatform();
  const monitoring = new TelemetryMonitoringPlatform();

  await t.test('Synchronizes customer to Salesforce CRM and order to SAP ERP', async () => {
    const crmRes = await enterprise.syncCustomerToCrm('SALESFORCE', 'john.doe@example.com');
    assert.equal(crmRes.syncStatus, 'SYNCED');

    const erpRes = await enterprise.syncOrderToErp('SAP', 'ORD-2026-1001');
    assert.equal(erpRes.erpDocumentId, 'SAP_DOC_ORD-2026-1001');
  });

  await t.test('Authenticates federated Google SSO token', async () => {
    const ssoUser = await identity.authenticateSsoToken('GOOGLE', 'mock_id_token');
    assert.equal(ssoUser.provider, 'GOOGLE');
    assert.ok(ssoUser.email.includes('google.com'));
  });

  await t.test('Exports Prometheus metrics telemetry string', () => {
    const metrics = monitoring.exportPrometheusMetrics();
    assert.ok(metrics.includes('syno_requests_total'));
  });
});
