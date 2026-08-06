/**
 * Payments Domain Aggregate
 *
 * PaymentAggregate is the consistency boundary for payment lifecycle transitions.
 * Emits immutable domain events on every successful state change.
 *
 * @module domain/payments/aggregates
 */

import { AggregateRoot, Money } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import {
  IAuthorization,
  ICapture,
  IPayment,
  IPaymentAttempt,
  IPaymentMethod,
  IPaymentTransaction,
  ISettlement,
  IVoid,
} from '../contracts';
import {
  PaymentAuthorizationFailedError,
  PaymentCaptureFailedError,
  PaymentVoidFailedError,
} from '../errors';
import {
  PaymentAuthorizedEvent,
  PaymentCapturedEvent,
  PaymentDisputedEvent,
  PaymentFailedEvent,
  PaymentInitiatedEvent,
  PaymentRefundRequestedEvent,
  PaymentVoidedEvent,
} from '../events';
import {
  FraudCheck,
  PaymentIdentifier,
  PaymentReceipt,
  PaymentStatus,
} from '../value-objects';

export class PaymentAggregate extends AggregateRoot<PaymentIdentifier> implements IPayment {
  private _status: PaymentStatus;
  private _transactions: IPaymentTransaction[] = [];
  private _attempts: IPaymentAttempt[] = [];
  private _authorization?: IAuthorization | undefined;
  private _capture?: ICapture | undefined;
  private _void?: IVoid | undefined;
  private _settlement?: ISettlement | undefined;
  private _fraudCheck?: FraudCheck | undefined;
  private _receipt?: PaymentReceipt | undefined;

  constructor(
    id: PaymentIdentifier,
    public readonly orderId: OrderIdentifier,
    public readonly amount: Money,
    public readonly paymentMethod: IPaymentMethod,
    public readonly providerId: string,
    public readonly customerId?: string | undefined
  ) {
    super(id);
    this._status = 'PENDING';
    this.addDomainEvent(
      new PaymentInitiatedEvent(id.value, orderId.value, amount.amount)
    );
  }

  public get status(): PaymentStatus {
    return this._status;
  }

  public get transactions(): readonly IPaymentTransaction[] {
    return [...this._transactions];
  }

  public get attempts(): readonly IPaymentAttempt[] {
    return [...this._attempts];
  }

  public get authorization(): IAuthorization | undefined {
    return this._authorization;
  }

  public get capture(): ICapture | undefined {
    return this._capture;
  }

  public get void(): IVoid | undefined {
    return this._void;
  }

  public get settlement(): ISettlement | undefined {
    return this._settlement;
  }

  public get fraudCheck(): FraudCheck | undefined {
    return this._fraudCheck;
  }

  public get receipt(): PaymentReceipt | undefined {
    return this._receipt;
  }

  public recordAttempt(attempt: IPaymentAttempt): void {
    this._attempts = [...this._attempts, attempt];
  }

  public authorize(auth: IAuthorization, fraudCheck?: FraudCheck): void {
    if (this._status !== 'PENDING') {
      throw new PaymentAuthorizationFailedError(
        `Cannot authorize payment in status '${this._status}'`
      );
    }
    if (fraudCheck && fraudCheck.recommendation === 'REJECT') {
      this._fraudCheck = fraudCheck;
      this._status = 'FAILED';
      this.addDomainEvent(
        new PaymentFailedEvent(this.id.value, 'FRAUD_SUSPECTED')
      );
      throw new PaymentAuthorizationFailedError('Rejected by fraud policy');
    }
    this._authorization = auth;
    this._fraudCheck = fraudCheck;
    this._status = 'AUTHORIZED';
    this.addDomainEvent(
      new PaymentAuthorizedEvent(this.id.value, auth.authCode)
    );
  }

  public capturePayment(capture: ICapture, receipt?: PaymentReceipt): void {
    if (this._status !== 'AUTHORIZED') {
      throw new PaymentCaptureFailedError('Cannot capture unauthorized payment');
    }
    this._capture = capture;
    this._receipt = receipt;
    this._status = 'CAPTURED';
    this.addDomainEvent(
      new PaymentCapturedEvent(this.id.value, capture.captureId)
    );
  }

  public voidPayment(reason?: string): void {
    if (this._status !== 'AUTHORIZED') {
      throw new PaymentVoidFailedError('Can only void authorized payments');
    }
    this._void = {
      voidId: crypto.randomUUID(),
      voidedAt: new Date(),
      ...(reason !== undefined ? { reason } : {}),
    };
    this._status = 'VOIDED';
    this.addDomainEvent(new PaymentVoidedEvent(this.id.value));
  }

  public attachSettlement(settlement: ISettlement): void {
    this._settlement = settlement;
  }

  public recordTransaction(transaction: IPaymentTransaction): void {
    this._transactions = [...this._transactions, transaction];
  }

  public markDisputed(reason: string): void {
    if (this._status !== 'CAPTURED') {
      throw new PaymentCaptureFailedError(
        'Only captured payments can be disputed'
      );
    }
    this._status = 'DISPUTED';
    this.addDomainEvent(new PaymentDisputedEvent(this.id.value, reason));
  }

  public requestRefund(amount: number): void {
    if (this._status !== 'CAPTURED' && this._status !== 'DISPUTED') {
      throw new PaymentCaptureFailedError(
        'Only captured/disputed payments can request refund'
      );
    }
    this.addDomainEvent(
      new PaymentRefundRequestedEvent(this.id.value, amount)
    );
  }

  public markRefunded(): void {
    this._status = 'REFUNDED';
  }
}
