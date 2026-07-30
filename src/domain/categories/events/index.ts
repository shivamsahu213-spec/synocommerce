import { BaseDomainEvent } from '../..';

export class CategoryCreatedEvent extends BaseDomainEvent {
  public readonly eventName = 'category.created';
  constructor(public readonly categoryId: string, public readonly slug: string) {
    super();
  }
}

export class CategoryMovedEvent extends BaseDomainEvent {
  public readonly eventName = 'category.moved';
  constructor(public readonly categoryId: string, public readonly newParentId?: string) {
    super();
  }
}
