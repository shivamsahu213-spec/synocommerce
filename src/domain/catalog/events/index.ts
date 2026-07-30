import { BaseDomainEvent } from '../..';

export class CatalogIndexedEvent extends BaseDomainEvent {
  public readonly eventName = 'catalog.indexed';
  constructor(public readonly catalogItemId: string) {
    super();
  }
}
