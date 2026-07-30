import { BaseDomainEvent } from '../..';

export abstract class ImmutableAddressDomainEvent extends BaseDomainEvent {
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

export class AddressCreatedEvent extends ImmutableAddressDomainEvent {
  public readonly eventName = 'address.created';
  constructor(
    aggregateId: string,
    public readonly role: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class AddressUpdatedEvent extends ImmutableAddressDomainEvent {
  public readonly eventName = 'address.updated';
  constructor(
    aggregateId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}
