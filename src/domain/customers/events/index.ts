import { BaseDomainEvent } from '../..';

export abstract class ImmutableCustomerDomainEvent extends BaseDomainEvent {
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

export class CustomerRegisteredEvent extends ImmutableCustomerDomainEvent {
  public readonly eventName = 'customer.registered';
  constructor(
    aggregateId: string,
    public readonly email: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class CustomerActivatedEvent extends ImmutableCustomerDomainEvent {
  public readonly eventName = 'customer.activated';
  constructor(
    aggregateId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class CustomerSuspendedEvent extends ImmutableCustomerDomainEvent {
  public readonly eventName = 'customer.suspended';
  constructor(
    aggregateId: string,
    public readonly reason: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}
