/**
 * Communication & Notification Platform Test Suite
 * @module src/integrations/tests/notifications.test
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {
  EmailProviderService,
  SmsProviderService,
  WhatsappProviderService,
  PushProviderService,
  NotificationEngine,
  NotificationSecurityEngine,
} from '../notifications';

test('Enterprise Communication & Notification Platform', async (t) => {
  const emailService = new EmailProviderService();
  const smsService = new SmsProviderService();
  const waService = new WhatsappProviderService();
  const pushService = new PushProviderService();
  const engine = new NotificationEngine();

  await t.test('Dispatches transactional email via specified provider', async () => {
    const res = await emailService.sendEmail({
      to: 'shivam@example.com',
      subject: 'Order Confirmed',
      htmlBody: '<h1>Order Confirmed</h1>',
      providerPreference: 'RESEND',
    });

    assert.equal(res.status, 'SENT');
    assert.equal(res.channel, 'EMAIL');
    assert.equal(res.providerUsed, 'RESEND');
    assert.ok(res.messageId.startsWith('msg_email_'));
  });

  await t.test('Dispatches SMS via Twilio provider', async () => {
    const res = await smsService.sendSms({
      toPhone: '+919988776655',
      message: 'Your OTP is 991823',
      providerPreference: 'TWILIO',
    });

    assert.equal(res.status, 'SENT');
    assert.equal(res.channel, 'SMS');
    assert.equal(res.providerUsed, 'TWILIO');
    assert.ok(res.messageId.startsWith('msg_sms_'));
  });

  await t.test('Dispatches WhatsApp template message via Meta Cloud API', async () => {
    const res = await waService.sendWhatsapp({
      toPhone: '+919988776655',
      templateName: 'order_update',
      providerPreference: 'META_WHATSAPP',
    });

    assert.equal(res.status, 'SENT');
    assert.equal(res.channel, 'WHATSAPP');
    assert.equal(res.providerUsed, 'META_WHATSAPP');
    assert.ok(res.messageId.startsWith('msg_wa_'));
  });

  await t.test('Dispatches Push notification via FCM', async () => {
    const res = await pushService.sendPush({
      deviceToken: 'token_fcm_991823',
      title: 'Order Shipped!',
      body: 'Your package is out for delivery.',
      providerPreference: 'FCM',
    });

    assert.equal(res.status, 'SENT');
    assert.equal(res.channel, 'PUSH');
    assert.equal(res.providerUsed, 'FCM');
    assert.ok(res.messageId.startsWith('msg_push_'));
  });

  await t.test('Renders template and supports Hindi localization', () => {
    const rendered = engine.renderTemplate(
      'ORDER_CONFIRMATION',
      { orderId: 'ORD-9912', customerName: 'Shivam', amount: '$150.00' },
      'hi'
    );

    assert.ok(rendered.subject.includes('ऑर्डर की पुष्टि'));
  });

  await t.test('Executes multi-channel fallback from EMAIL to SMS', async () => {
    const res = await engine.dispatchWithFallback(
      { to: 'shivam@example.com', subject: 'Test', htmlBody: '<p>Test</p>' },
      { toPhone: '+919988776655', message: 'Fallback SMS' }
    );

    assert.equal(res.status, 'SENT');
    assert.equal(res.channel, 'EMAIL');
  });

  await t.test('Verifies webhook HMAC signature and prevents duplicate events', () => {
    NotificationSecurityEngine.resetCache();

    const rawBody = JSON.stringify({ eventId: 'evt_1001', type: 'email.delivered' });
    const secret = 'webhook_secret_key';
    const sig = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

    const isValid = NotificationSecurityEngine.verifyWebhookSignature(rawBody, sig, secret);
    assert.equal(isValid, true);

    const isDup1 = NotificationSecurityEngine.isDuplicateEvent('evt_1001');
    assert.equal(isDup1, false);

    const isDup2 = NotificationSecurityEngine.isDuplicateEvent('evt_1001');
    assert.equal(isDup2, true);
  });
});
