import { BaseDomainEvent } from '../..';

export class BrandCreatedEvent extends BaseDomainEvent {
  public readonly eventName = 'brand.created';
  constructor(public readonly brandId: string, public readonly name: string) {
    super();
  }
}

export class BrandUpdatedEvent extends BaseDomainEvent {
  public readonly eventName = 'brand.updated';
  constructor(public readonly brandId: string) {
    super();
  }
}
