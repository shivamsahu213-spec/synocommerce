/**
 * Invoicing Domain Aggregate
 *
 * InvoiceAggregate is the consistency boundary for invoice lifecycle transitions.
 * Emits immutable domain events on every successful state change.
 *
 * @module domain/invoicing/aggregates
 */

import { AggregateRoot } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { IInvoice, IInvoiceLine } from '../contracts';
import {
  InvoiceIdentifier,
  InvoiceNumber,
  InvoiceStatus,
  InvoiceTotals,
} from '../value-objects';
import {
  InvoiceIssueFailedError,
  InvoicePaymentFailedError,
  InvoiceCancelFailedError,
  InvoiceVoidFailedError,
} from '../errors';
import {
  InvoiceGeneratedEvent,
  InvoicePaidEvent,
  InvoiceCancelledEvent,
  InvoiceVoidedEvent,
} from '../events';

export class InvoiceAggregate
  extends AggregateRoot<InvoiceIdentifier>
  implements IInvoice
{
  private _status: InvoiceStatus;
  private _lines: IInvoiceLine[];
  private _totals: InvoiceTotals;
  private _issuedAt?: Date;

  constructor(
    id: InvoiceIdentifier,
    public readonly invoiceNumber: InvoiceNumber,
    public readonly orderId: OrderIdentifier,
    public readonly customerId: string,
    totals: InvoiceTotals,
    lines: readonly IInvoiceLine[] = [],
    public readonly dueDate?: Date,
    issueImmediately: boolean = true
  ) {
    super(id);
    this._totals = totals;
    this._lines = [...lines];

    if (issueImmediately) {
      this._status = 'ISSUED';
      this._issuedAt = new Date();
      this.addDomainEvent(
        new InvoiceGeneratedEvent(
          id.value,
          invoiceNumber.value,
          orderId.value
        )
      );
    } else {
      this._status = 'DRAFT';
    }
  }

  public get status(): InvoiceStatus {
    return this._status;
  }

  public get lines(): readonly IInvoiceLine[] {
    return [...this._lines];
  }

  public get totals(): InvoiceTotals {
    return this._totals;
  }

  public get issuedAt(): Date | undefined {
    return this._issuedAt;
  }

  public issue(): void {
    if (this._status !== 'DRAFT') {
      throw new InvoiceIssueFailedError(
        `Cannot issue invoice in status '${this._status}'`
      );
    }
    if (this._lines.length === 0) {
      throw new InvoiceIssueFailedError('Cannot issue an invoice with no lines');
    }
    this._status = 'ISSUED';
    this._issuedAt = new Date();
    this.addDomainEvent(
      new InvoiceGeneratedEvent(
        this.id.value,
        this.invoiceNumber.value,
        this.orderId.value
      )
    );
  }

  public markPaid(): void {
    if (this._status !== 'ISSUED') {
      throw new InvoicePaymentFailedError(
        `Cannot mark paid invoice in status '${this._status}'`
      );
    }
    this._status = 'PAID';
    this.addDomainEvent(new InvoicePaidEvent(this.id.value));
  }

  public cancel(): void {
    if (this._status !== 'DRAFT' && this._status !== 'ISSUED') {
      throw new InvoiceCancelFailedError(
        `Cannot cancel invoice in status '${this._status}'`
      );
    }
    this._status = 'CANCELLED';
    this.addDomainEvent(new InvoiceCancelledEvent(this.id.value));
  }

  public void(): void {
    if (this._status !== 'ISSUED' && this._status !== 'PAID') {
      throw new InvoiceVoidFailedError(
        `Cannot void invoice in status '${this._status}'`
      );
    }
    this._status = 'VOID';
    this.addDomainEvent(new InvoiceVoidedEvent(this.id.value));
  }
}
