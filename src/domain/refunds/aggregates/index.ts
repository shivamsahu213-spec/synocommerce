/**
 * Refunds Domain Aggregate
 *
 * RefundAggregate is the consistency boundary for refund lifecycle transitions.
 * Emits immutable domain events on every successful state change.
 *
 * @module domain/refunds/aggregates
 */

import { AggregateRoot, Money } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { PaymentIdentifier } from '../../payments/value-objects';
import { ReturnIdentifier } from '../../returns/value-objects';
import { IRefund, IRefundLine } from '../contracts';
import {
  RefundIdentifier,
  RefundReason,
  RefundStatus,
} from '../value-objects';
import {
  RefundApprovalFailedError,
  RefundProcessFailedError,
  RefundRejectionFailedError,
} from '../errors';
import {
  RefundCreatedEvent,
  RefundApprovedEvent,
  RefundProcessedEvent,
  RefundRejectedEvent,
  RefundFailedEvent,
} from '../events';

export class RefundAggregate
  extends AggregateRoot<RefundIdentifier>
  implements IRefund
{
  private _status: RefundStatus;
  private _lines: IRefundLine[];

  constructor(
    id: RefundIdentifier,
    public readonly orderId: OrderIdentifier,
    public readonly paymentId: PaymentIdentifier,
    public readonly amount: Money,
    public readonly reason: RefundReason,
    lines: readonly IRefundLine[] = [],
    public readonly returnId?: ReturnIdentifier
  ) {
    super(id);
    this._status = 'PENDING';
    this._lines = [...lines];
    this.addDomainEvent(
      new RefundCreatedEvent(id.value, orderId.value, amount.amount)
    );
  }

  public get status(): RefundStatus {
    return this._status;
  }

  public get lines(): readonly IRefundLine[] {
    return [...this._lines];
  }

  public approve(): void {
    if (this._status !== 'PENDING') {
      throw new RefundApprovalFailedError(
        `Cannot approve refund in status '${this._status}'`
      );
    }
    this._status = 'APPROVED';
    this.addDomainEvent(new RefundApprovedEvent(this.id.value));
  }

  public process(transactionId: string): void {
    if (this._status !== 'APPROVED') {
      throw new RefundProcessFailedError(
        'Can only process an approved refund'
      );
    }
    this._status = 'PROCESSED';
    this.addDomainEvent(
      new RefundProcessedEvent(this.id.value, transactionId)
    );
  }

  public reject(reason: string): void {
    if (this._status !== 'PENDING' && this._status !== 'APPROVED') {
      throw new RefundRejectionFailedError(
        `Cannot reject refund in status '${this._status}'`
      );
    }
    this._status = 'REJECTED';
    this.addDomainEvent(new RefundRejectedEvent(this.id.value, reason));
  }

  public fail(reason: string): void {
    if (this._status !== 'APPROVED') {
      throw new RefundProcessFailedError(
        `Cannot fail refund in status '${this._status}'`
      );
    }
    this._status = 'FAILED';
    this.addDomainEvent(new RefundFailedEvent(this.id.value, reason));
  }
}
