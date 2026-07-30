/**
 * Webhook Architecture Contracts
 *
 * Incoming webhook ingestion, signature verification, outgoing webhooks, signing, retries, and DLQ.
 *
 * @module delivery/webhooks/webhook.interface
 */

import { DeliveryRequest, DeliveryResponse } from '../contracts';

export interface IWebhookSignatureVerifier {
  verifySignature(payload: string, signature: string, secret: string): Promise<boolean>;
}

export interface IWebhookSigner {
  signPayload(payload: string, secret: string): Promise<string>;
}

export interface IIncomingWebhookHandler {
  readonly providerName: string;
  handleWebhook(request: DeliveryRequest): Promise<DeliveryResponse>;
}

export interface OutgoingWebhookPayload {
  readonly eventId: string;
  readonly eventName: string;
  readonly payload: Record<string, unknown>;
  readonly timestamp: Date;
}

export interface IOutgoingWebhookDispatcher {
  dispatch(targetUrl: string, secret: string, webhook: OutgoingWebhookPayload): Promise<boolean>;
}
