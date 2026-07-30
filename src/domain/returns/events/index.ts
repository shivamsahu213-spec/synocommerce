/**
 * Returns Domain Events
 *
 * Every event extends ImmutableReturnDomainEvent which guarantees
 * eventId, occurredOn, aggregateId, version, and frozen metadata.
 *
 * @module domain/returns/events
 */

import { BaseDomainEvent } from '../..';

export abstract class ImmutableReturnDomainEvent extends BaseDomainEvent {
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

export class ReturnRequestedEvent extends ImmutableReturnDomainEvent {
  public readonly eventName = 'return.requested';

  constructor(
    aggregateId: string,
    public readonly orderId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class ReturnApprovedEvent extends ImmutableReturnDomainEvent {
  public readonly eventName = 'return.approved';

  constructor(
    aggregateId: string,
    public readonly rmaNumber: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class ReturnRejectedEvent extends ImmutableReturnDomainEvent {
  public readonly eventName = 'return.rejected';

  constructor(
    aggregateId: string,
    public readonly reason: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class ItemsReceivedEvent extends ImmutableReturnDomainEvent {
  public readonly eventName = 'return.items_received';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}

export class ReturnCompletedEvent extends ImmutableReturnDomainEvent {
  public readonly eventName = 'return.completed';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}
