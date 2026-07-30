/**
 * Shipping Domain Events
 *
 * Every event extends ImmutableShippingDomainEvent which guarantees
 * eventId, occurredOn, aggregateId, version, and frozen metadata.
 *
 * @module domain/shipping/events
 */

import { BaseDomainEvent } from '../..';

export abstract class ImmutableShippingDomainEvent extends BaseDomainEvent {
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

export class ShipmentCreatedEvent extends ImmutableShippingDomainEvent {
  public readonly eventName = 'shipment.created';

  constructor(
    aggregateId: string,
    public readonly orderId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class ShipmentPackedEvent extends ImmutableShippingDomainEvent {
  public readonly eventName = 'shipment.packed';

  constructor(
    aggregateId: string,
    public readonly labelId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class ShipmentDispatchedEvent extends ImmutableShippingDomainEvent {
  public readonly eventName = 'shipment.dispatched';

  constructor(
    aggregateId: string,
    public readonly trackingNumber: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class ShipmentDeliveredEvent extends ImmutableShippingDomainEvent {
  public readonly eventName = 'shipment.delivered';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}

export class ShipmentReturnedEvent extends ImmutableShippingDomainEvent {
  public readonly eventName = 'shipment.returned';

  constructor(
    aggregateId: string,
    public readonly reason: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class TrackingUpdatedEvent extends ImmutableShippingDomainEvent {
  public readonly eventName = 'shipment.tracking_updated';

  constructor(
    aggregateId: string,
    public readonly trackingStatus: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}
