import { BaseDomainEvent } from '../..';

export abstract class ImmutableOrderDomainEvent extends BaseDomainEvent {
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

export class OrderPlacedEvent extends ImmutableOrderDomainEvent {
  public readonly eventName = 'order.placed';
  constructor(
    aggregateId: string,
    public readonly orderNumber: string,
    public readonly customerId: string,
    public readonly grandTotal: number,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class OrderConfirmedEvent extends ImmutableOrderDomainEvent {
  public readonly eventName = 'order.confirmed';
  constructor(
    aggregateId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class OrderCancelledEvent extends ImmutableOrderDomainEvent {
  public readonly eventName = 'order.cancelled';
  constructor(
    aggregateId: string,
    public readonly reason: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class OrderCompletedEvent extends ImmutableOrderDomainEvent {
  public readonly eventName = 'order.completed';
  constructor(
    aggregateId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class RefundInitiatedEvent extends ImmutableOrderDomainEvent {
  public readonly eventName = 'order.refund_initiated';
  constructor(
    aggregateId: string,
    public readonly refundAmount: number,
    public readonly reason: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}
