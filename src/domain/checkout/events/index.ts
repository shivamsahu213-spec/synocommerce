import { BaseDomainEvent } from '../..';

export abstract class ImmutableCheckoutDomainEvent extends BaseDomainEvent {
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

export class CheckoutStartedEvent extends ImmutableCheckoutDomainEvent {
  public readonly eventName = 'checkout.started';
  constructor(
    aggregateId: string,
    public readonly cartId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class CheckoutValidatedEvent extends ImmutableCheckoutDomainEvent {
  public readonly eventName = 'checkout.validated';
  constructor(
    aggregateId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class CheckoutCompletedEvent extends ImmutableCheckoutDomainEvent {
  public readonly eventName = 'checkout.completed';
  constructor(
    aggregateId: string,
    public readonly orderId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}
