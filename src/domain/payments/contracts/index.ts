/**
 * Payments Domain Contracts
 *
 * Provider-neutral interfaces describing the payment model surface.
 * Implementations of gateway ports live outside the domain layer.
 *
 * @module domain/payments/contracts
 */

import { Money } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import {
  PaymentIdentifier,
  TransactionIdentifier,
  PaymentStatus,
  PaymentFailureReason,
  FraudCheck,
  PaymentReceipt,
  PaymentToken,
} from '../value-objects';

/** Stored / tokenized payment instrument metadata (no raw PAN). */
export interface IPaymentMethod {
  readonly id: string;
  readonly type: string;
  readonly provider: string;
  readonly displayHint?: string | undefined;
  readonly token?: PaymentToken | undefined;
}

/** Append-only ledger entry for a payment action. */
export interface IPaymentTransaction {
  readonly transactionId: TransactionIdentifier;
  readonly action: 'AUTHORIZE' | 'CAPTURE' | 'VOID' | 'REFUND' | 'SETTLE';
  readonly amount: Money;
  readonly isSuccess: boolean;
  readonly providerReference?: string | undefined;
  readonly timestamp: Date;
}

/** Successful authorization hold. */
export interface IAuthorization {
  readonly authCode: string;
  readonly amount: Money;
  readonly authorizedAt: Date;
  readonly expiresAt: Date;
}

/** Successful funds capture. */
export interface ICapture {
  readonly captureId: string;
  readonly amount: Money;
  readonly capturedAt: Date;
}

/** Void of a prior authorization. */
export interface IVoid {
  readonly voidId: string;
  readonly voidedAt: Date;
  readonly reason?: string | undefined;
}

/** Provider settlement / payout batch reference. */
export interface ISettlement {
  readonly settlementId: string;
  readonly settledAt: Date;
  readonly netAmount: Money;
  readonly feeAmount?: Money | undefined;
}

/** Single attempt against a payment intent (retry-aware). */
export interface IPaymentAttempt {
  readonly attemptId: string;
  readonly timestamp: Date;
  readonly isSuccess: boolean;
  readonly failureReason?: PaymentFailureReason | undefined;
}

/**
 * Payment intent — the amount and order context the shopper authorized.
 * Distinct from the full PaymentAggregate lifecycle.
 */
export interface IPaymentIntent {
  readonly intentId: string;
  readonly orderId: OrderIdentifier;
  readonly amount: Money;
  readonly currencyCode: string;
  readonly status: PaymentStatus;
}

/** Vendor-neutral description of a payment provider capability set. */
export interface IPaymentProvider {
  readonly providerId: string;
  readonly name: string;
  readonly supportedMethods: readonly string[];
  readonly supportsAuthCapture: boolean;
  readonly supportsPartialCapture: boolean;
  readonly supportsRefunds: boolean;
}

/** Aggregate root contract for the payments bounded context. */
export interface IPayment {
  readonly id: PaymentIdentifier;
  readonly orderId: OrderIdentifier;
  readonly customerId?: string | undefined;
  readonly amount: Money;
  readonly status: PaymentStatus;
  readonly paymentMethod: IPaymentMethod;
  readonly providerId: string;
  readonly transactions: readonly IPaymentTransaction[];
  readonly attempts: readonly IPaymentAttempt[];
  readonly authorization?: IAuthorization | undefined;
  readonly capture?: ICapture | undefined;
  readonly void?: IVoid | undefined;
  readonly settlement?: ISettlement | undefined;
  readonly fraudCheck?: FraudCheck | undefined;
  readonly receipt?: PaymentReceipt | undefined;
}
