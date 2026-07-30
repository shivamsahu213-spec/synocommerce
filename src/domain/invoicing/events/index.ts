/**
 * Invoicing Domain Events
 *
 * Every event extends ImmutableInvoiceDomainEvent which guarantees
 * eventId, occurredOn, aggregateId, version, and frozen metadata.
 *
 * @module domain/invoicing/events
 */

import { BaseDomainEvent } from '../..';

export abstract class ImmutableInvoiceDomainEvent extends BaseDomainEvent {
  public readonly version: number = 1;
  public readonly metadata: Record<string, unknown>;

  constructor(
    public readonly aggregateId: string,
    metadata: Record<string, unknown> = {}
  ) {
    super();
    this.metadata = Object.freeze({ ...metadata });
  }
}

export class InvoiceGeneratedEvent extends ImmutableInvoiceDomainEvent {
  public readonly eventName = 'invoice.generated';

  constructor(
    aggregateId: string,
    public readonly invoiceNumber: string,
    public readonly orderId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class InvoicePaidEvent extends ImmutableInvoiceDomainEvent {
  public readonly eventName = 'invoice.paid';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}

export class InvoiceCancelledEvent extends ImmutableInvoiceDomainEvent {
  public readonly eventName = 'invoice.cancelled';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}

export class InvoiceVoidedEvent extends ImmutableInvoiceDomainEvent {
  public readonly eventName = 'invoice.voided';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}
