import { BaseDomainEvent } from '../..';

export abstract class ImmutableCartDomainEvent extends BaseDomainEvent {
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

export class CartCreatedEvent extends ImmutableCartDomainEvent {
  public readonly eventName = 'cart.created';
  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}

export class ItemAddedEvent extends ImmutableCartDomainEvent {
  public readonly eventName = 'cart.item_added';
  constructor(
    aggregateId: string,
    public readonly sku: string,
    public readonly quantity: number,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class ItemRemovedEvent extends ImmutableCartDomainEvent {
  public readonly eventName = 'cart.item_removed';
  constructor(
    aggregateId: string,
    public readonly sku: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class CouponAppliedEvent extends ImmutableCartDomainEvent {
  public readonly eventName = 'cart.coupon_applied';
  constructor(
    aggregateId: string,
    public readonly couponCode: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class CartMergedEvent extends ImmutableCartDomainEvent {
  public readonly eventName = 'cart.merged';
  constructor(
    aggregateId: string,
    public readonly sourceCartId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class CartExpiredEvent extends ImmutableCartDomainEvent {
  public readonly eventName = 'cart.expired';
  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}
