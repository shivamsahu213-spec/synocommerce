import { BaseDomainEvent } from '../..';

export class ProductCreatedEvent extends BaseDomainEvent {
  public readonly eventName = 'product.created';
  constructor(public readonly productId: string, public readonly slug: string) {
    super();
  }
}

export class ProductPublishedEvent extends BaseDomainEvent {
  public readonly eventName = 'product.published';
  constructor(public readonly productId: string) {
    super();
  }
}
