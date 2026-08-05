/**
 * Live Razorpay & Stripe Payment Integration Test Suite
 * @module src/integrations/tests/live-payments.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {
  RazorpayProvider,
  StripeProvider,
  PaymentSecurityEngine,
} from '../payments';

test('Live Payment Gateway Integrations: Razorpay & Stripe', async (t) => {
  const razorpay = new RazorpayProvider('rzp_test_key', 'rzp_test_secret', 'rzp_test_webhook_secret');
  const stripe = new StripeProvider('sk_test_key', 'pk_test_key', 'whsec_test_secret');

  await t.test('Executes Razorpay Order creation, signature verification, and refund', async () => {
    const order = await razorpay.createOrder({
      amountInPaisa: 249900,
      currency: 'INR',
      receipt: 'rcpt_1001',
    });

    assert.ok(order.id.startsWith('order_'));
    assert.equal(order.amount, 249900);

    const paymentId = 'pay_test_99182';
    const text = `${order.id}|${paymentId}`;
    const validSignature = crypto
      .createHmac('sha256', 'rzp_test_secret')
      .update(text)
      .digest('hex');

    const isValidSig = razorpay.verifyPaymentSignature({
      razorpayOrderId: order.id,
      razorpayPaymentId: paymentId,
      razorpaySignature: validSignature,
    });
    assert.equal(isValidSig, true);

    const refund = await razorpay.createRefund({ paymentId, amountInPaisa: 50000 });
    assert.equal(refund.status, 'processed');
    assert.ok(refund.id.startsWith('rfnd_'));
  });

  await t.test('Verifies Razorpay webhook payload and prevents duplicate event delivery', () => {
    PaymentSecurityEngine.resetDeduplicationCache();

    const webhookBody = JSON.stringify({
      entity: 'event',
      account_id: 'acc_100',
      event: 'payment.captured',
      contains: ['payment'],
      payload: { payment: { entity: { id: 'pay_1001' } } },
      created_at: Math.floor(Date.now() / 1000),
    });

    const sig = crypto
      .createHmac('sha256', 'rzp_test_webhook_secret')
      .update(webhookBody)
      .digest('hex');

    const res1 = razorpay.verifyWebhook(webhookBody, sig, Math.floor(Date.now() / 1000));
    assert.equal(res1.valid, true);
    assert.equal(res1.isDuplicate, false);

    const res2 = razorpay.verifyWebhook(webhookBody, sig, Math.floor(Date.now() / 1000));
    assert.equal(res2.valid, true);
    assert.equal(res2.isDuplicate, true);
  });

  await t.test('Rejects expired or tampered Razorpay webhook timestamps', () => {
    const webhookBody = JSON.stringify({ event: 'payment.failed' });
    const expiredTimestamp = Math.floor(Date.now() / 1000) - 600; // 10 minutes ago
    const sig = crypto.createHmac('sha256', 'rzp_test_webhook_secret').update(webhookBody).digest('hex');

    const res = razorpay.verifyWebhook(webhookBody, sig, expiredTimestamp);
    assert.equal(res.valid, false);
    assert.equal(res.error, 'WEBHOOK_TIMESTAMP_EXPIRED');
  });

  await t.test('Executes Stripe Customer creation, Payment Intent confirmation, and Refund', async () => {
    const cust = await stripe.createCustomer({ email: 'shivam@example.com', name: 'Shivam Sahu' });
    assert.ok(cust.id.startsWith('cus_'));

    const pi = await stripe.createPaymentIntent({ amountInCents: 5000, currency: 'USD', customerId: cust.id });
    assert.ok(pi.id.startsWith('pi_'));

    const confirmed = await stripe.confirmPaymentIntent(pi.id);
    assert.equal(confirmed.status, 'succeeded');

    const ref = await stripe.createRefund({ paymentIntentId: pi.id });
    assert.equal(ref.status, 'succeeded');
    assert.ok(ref.id.startsWith('re_'));
  });

  await t.test('Verifies Stripe webhook payload signature with timestamp header parsing', () => {
    PaymentSecurityEngine.resetDeduplicationCache();

    const timestamp = Math.floor(Date.now() / 1000);
    const webhookBody = JSON.stringify({
      id: 'evt_stripe_9921',
      object: 'event',
      type: 'payment_intent.succeeded',
      created: timestamp,
      data: { object: {} },
    });

    const signedPayload = `${timestamp}.${webhookBody}`;
    const sig = crypto
      .createHmac('sha256', 'whsec_test_secret')
      .update(signedPayload)
      .digest('hex');

    const stripeHeader = `t=${timestamp},v1=${sig}`;

    const res = stripe.verifyWebhook(webhookBody, stripeHeader);
    assert.equal(res.valid, true);
    assert.equal(res.isDuplicate, false);
  });

  await t.test('Executes exponential backoff retries on transient network errors', async () => {
    let attempts = 0;
    const result = await PaymentSecurityEngine.executeWithRetry(async () => {
      attempts++;
      if (attempts < 2) throw new Error('TRANSIENT_NETWORK_TIMEOUT');
      return 'SUCCESS';
    }, 3, 10);

    assert.equal(result, 'SUCCESS');
    assert.equal(attempts, 2);
  });
});
