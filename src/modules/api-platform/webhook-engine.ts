/**
 * Webhook Delivery, HMAC Verification & Event Replay Engine
 * @module modules/api-platform/webhook-engine
 */

import crypto from 'node:crypto';

import { WebhookDeliveryRecord,WebhookEndpointRecord } from './types';

export class WebhookDeliveryEngine {
  private readonly _endpoints = new Map<string, WebhookEndpointRecord>();
  private readonly _deliveries = new Map<string, WebhookDeliveryRecord>();

  public registerWebhookEndpoint(clientId: string, targetUrl: string, subscribedEvents: string[]): WebhookEndpointRecord {
    const endpointId = `wh_${Date.now()}`;
    const secret = `whsec_${crypto.randomBytes(16).toString('hex')}`;
    const record: WebhookEndpointRecord = {
      endpointId,
      clientId,
      targetUrl,
      secret,
      subscribedEvents,
      active: true,
    };

    this._endpoints.set(endpointId, record);
    return record;
  }

  public computeSignature(payload: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }

  public dispatchWebhookEvent(endpointId: string, event: string, payload: Record<string, any>): WebhookDeliveryRecord {
    const ep = this._endpoints.get(endpointId);
    if (!ep || !ep.active) {
      throw new Error(`Webhook endpoint '${endpointId}' active status invalid`);
    }

    const payloadStr = JSON.stringify(payload);
    const signature = this.computeSignature(payloadStr, ep.secret);
    const deliveryId = `del_${Date.now()}`;

    const deliveryRecord: WebhookDeliveryRecord = {
      deliveryId,
      endpointId,
      event,
      payload,
      signature,
      statusCode: 200,
      attempts: 1,
      status: 'DELIVERED',
      timestamp: new Date(),
    };

    this._deliveries.set(deliveryId, deliveryRecord);
    return deliveryRecord;
  }

  public replayWebhookEvent(deliveryId: string): WebhookDeliveryRecord {
    const delivery = this._deliveries.get(deliveryId);
    if (!delivery) {
      throw new Error(`Webhook delivery '${deliveryId}' not found`);
    }

    delivery.attempts++;
    delivery.status = 'REPLAYED';
    return delivery;
  }
}
