/**
 * Payments Domain Value Objects
 *
 * @module domain/payments/value-objects
 */

import { Identifier, Money } from '../..';

/** Strongly-typed identity for PaymentAggregate. */
export class PaymentIdentifier extends Identifier {}

/** Strongly-typed identity for a payment transaction record. */
export class TransactionIdentifier extends Identifier {}

/**
 * Canonical payment lifecycle status owned by the payments bounded context.
 * Distinct from orders.OrderPaymentStatus (order-level projection).
 */
export type PaymentStatus =
  | 'PENDING'
  | 'AUTHORIZED'
  | 'CAPTURED'
  | 'VOIDED'
  | 'FAILED'
  | 'REFUNDED'
  | 'DISPUTED';

export type PaymentFailureReason =
  | 'INSUFFICIENT_FUNDS'
  | 'EXPIRED_CARD'
  | 'FRAUD_SUSPECTED'
  | 'GATEWAY_ERROR'
  | 'DECLINED'
  | 'INVALID_METHOD'
  | 'TIMEOUT';

/**
 * Immutable fraud-evaluation snapshot produced by a fraud provider adapter.
 */
export interface FraudCheck {
  readonly score: number;
  readonly isRiskAccepted: boolean;
  readonly recommendation: 'ACCEPT' | 'REVIEW' | 'REJECT';
  readonly providerNotes?: string;
  readonly checkedAt: Date;
}

/**
 * Immutable customer-facing payment receipt snapshot.
 */
export interface PaymentReceipt {
  readonly receiptNumber: string;
  readonly timestamp: Date;
  readonly amount: Money;
  readonly providerReference: string;
}

/**
 * Opaque, provider-issued payment token. Never stores raw card/PAN data.
 */
export interface PaymentToken {
  readonly token: string;
  readonly provider: string;
  readonly expiresAt?: Date;
}
