/**
 * Payments Domain Entities
 *
 * Child entities belonging to PaymentAggregate. Kept persistence-independent.
 *
 * @module domain/payments/entities
 */

import { Entity, Identifier, Money } from '../..';
import {
  IPaymentAttempt,
  IPaymentTransaction,
} from '../contracts';
import {
  PaymentFailureReason,
  TransactionIdentifier,
} from '../value-objects';

export class PaymentAttemptEntity extends Entity<Identifier> implements IPaymentAttempt {
  constructor(
    id: Identifier,
    public readonly timestamp: Date,
    public readonly isSuccess: boolean,
    public readonly failureReason?: PaymentFailureReason | undefined
  ) {
    super(id);
  }

  public get attemptId(): string {
    return this._id.value;
  }
}

export class PaymentTransactionEntity extends Entity<TransactionIdentifier> implements IPaymentTransaction {
  constructor(
    id: TransactionIdentifier,
    public readonly action: 'AUTHORIZE' | 'CAPTURE' | 'VOID' | 'REFUND' | 'SETTLE',
    public readonly amount: Money,
    public readonly isSuccess: boolean,
    public readonly timestamp: Date,
    public readonly providerReference?: string | undefined
  ) {
    super(id);
  }

  public get transactionId(): TransactionIdentifier {
    return this._id;
  }
}
