/**
 * Fulfillment Domain Events
 *
 * Every event extends ImmutableFulfillmentDomainEvent which guarantees
 * eventId, occurredOn, aggregateId, version, and frozen metadata.
 *
 * @module domain/fulfillment/events
 */

import { BaseDomainEvent } from '../..';

export abstract class ImmutableFulfillmentDomainEvent extends BaseDomainEvent {
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

export class FulfillmentStartedEvent extends ImmutableFulfillmentDomainEvent {
  public readonly eventName = 'fulfillment.started';

  constructor(
    aggregateId: string,
    public readonly orderId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class ItemsAllocatedEvent extends ImmutableFulfillmentDomainEvent {
  public readonly eventName = 'fulfillment.items_allocated';

  constructor(
    aggregateId: string,
    public readonly assignmentCount: number,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class ItemsPackedEvent extends ImmutableFulfillmentDomainEvent {
  public readonly eventName = 'fulfillment.items_packed';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}

export class ItemsShippedEvent extends ImmutableFulfillmentDomainEvent {
  public readonly eventName = 'fulfillment.items_shipped';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}

export class FulfillmentCompletedEvent extends ImmutableFulfillmentDomainEvent {
  public readonly eventName = 'fulfillment.completed';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}
