/**
 * Enterprise Payment Gateway Integration Platform
 * @module integrations/payments/payment-integration
 */

import crypto from 'node:crypto';

export type PaymentGatewayType = 'STRIPE' | 'ADYEN' | 'PAYPAL' | 'RAZORPAY' | 'AUTHORIZE_NET';

export interface PaymentAuthorizeRequest {
  amount: number;
  currency: string;
  idempotencyKey?: string | undefined;
}

export interface PaymentTransactionResult {
  transactionId: string;
  gateway: PaymentGatewayType;
  status: 'AUTHORIZED' | 'CAPTURED' | 'REFUNDED' | 'FAILED';
  amount: number;
  currency: string;
  signature: string;
}

export interface WebhookEventPayload {
  eventId: string;
  type: string;
  data: Record<string, any>;
  signatureHeader: string;
}

export class PaymentIntegrationPlatform {
  private readonly _circuitBreakers = new Map<PaymentGatewayType, { failures: number; isOpen: boolean }>();
  private readonly _processedIdempotencyKeys = new Set<string>();

  constructor() {
    const gateways: PaymentGatewayType[] = ['STRIPE', 'ADYEN', 'PAYPAL', 'RAZORPAY', 'AUTHORIZE_NET'];
    gateways.forEach((g) => this._circuitBreakers.set(g, { failures: 0, isOpen: false }));
  }

  public async authorize(
    gateway: PaymentGatewayType,
    req: PaymentAuthorizeRequest
  ): Promise<PaymentTransactionResult> {
    const breaker = this._circuitBreakers.get(gateway);
    if (breaker?.isOpen) {
      throw new Error(`Circuit breaker open for gateway '${gateway}'. Request blocked.`);
    }

    if (req.idempotencyKey) {
      if (this._processedIdempotencyKeys.has(req.idempotencyKey)) {
        // Return idempotent cached transaction
        const transactionId = `txn_idempotent_${req.idempotencyKey}`;
        return {
          transactionId,
          gateway,
          status: 'AUTHORIZED',
          amount: req.amount,
          currency: req.currency,
          signature: crypto.createHmac('sha256', 'syno_secret_key').update(transactionId).digest('hex'),
        };
      }
      this._processedIdempotencyKeys.add(req.idempotencyKey);
    }

    const transactionId = `txn_${gateway.toLowerCase()}_${crypto.randomUUID()}`;
    const signature = crypto
      .createHmac('sha256', 'syno_secret_key')
      .update(`${transactionId}:${req.amount}:${req.currency}`)
      .digest('hex');

    return {
      transactionId,
      gateway,
      status: 'AUTHORIZED',
      amount: req.amount,
      currency: req.currency,
      signature,
    };
  }

  public async capture(gateway: PaymentGatewayType, transactionId: string, amount: number): Promise<PaymentTransactionResult> {
    return {
      transactionId,
      gateway,
      status: 'CAPTURED',
      amount,
      currency: 'USD',
      signature: crypto.createHmac('sha256', 'syno_secret_key').update(`${transactionId}:captured`).digest('hex'),
    };
  }

  public async refund(gateway: PaymentGatewayType, transactionId: string, amount: number): Promise<PaymentTransactionResult> {
    return {
      transactionId,
      gateway,
      status: 'REFUNDED',
      amount,
      currency: 'USD',
      signature: crypto.createHmac('sha256', 'syno_secret_key').update(`${transactionId}:refunded`).digest('hex'),
    };
  }

  public verifyWebhookSignature(payload: WebhookEventPayload, secret: string): boolean {
    const expected = crypto.createHmac('sha256', secret).update(payload.eventId).digest('hex');
    return payload.signatureHeader === expected;
  }

  public verifyRazorpayWebhookSignature(payloadBody: string, signature: string, secret: string): boolean {
    const expected = crypto.createHmac('sha256', secret).update(payloadBody).digest('hex');
    return expected === signature;
  }

  public verifyStripeWebhookSignature(payloadBody: string, signatureHeader: string, secret: string): boolean {
    const expected = crypto.createHmac('sha256', secret).update(payloadBody).digest('hex');
    return signatureHeader.includes(expected) || signatureHeader === expected;
  }
}
