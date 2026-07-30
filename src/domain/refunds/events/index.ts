/**
 * Refunds Domain Events
 *
 * Every event extends ImmutableRefundDomainEvent which guarantees
 * eventId, occurredOn, aggregateId, version, and frozen metadata.
 *
 * @module domain/refunds/events
 */

import { BaseDomainEvent } from '../..';

export abstract class ImmutableRefundDomainEvent extends BaseDomainEvent {
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

export class RefundCreatedEvent extends ImmutableRefundDomainEvent {
  public readonly eventName = 'refund.created';

  constructor(
    aggregateId: string,
    public readonly orderId: string,
    public readonly amount: number,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class RefundApprovedEvent extends ImmutableRefundDomainEvent {
  public readonly eventName = 'refund.approved';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}

export class RefundProcessedEvent extends ImmutableRefundDomainEvent {
  public readonly eventName = 'refund.processed';

  constructor(
    aggregateId: string,
    public readonly transactionId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class RefundRejectedEvent extends ImmutableRefundDomainEvent {
  public readonly eventName = 'refund.rejected';

  constructor(
    aggregateId: string,
    public readonly reason: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class RefundFailedEvent extends ImmutableRefundDomainEvent {
  public readonly eventName = 'refund.failed';

  constructor(
    aggregateId: string,
    public readonly reason: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}
