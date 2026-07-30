import { IDomainPolicy } from '../..';
import { ProductAggregate } from '../aggregates';

export interface IProductPublishingPolicy extends IDomainPolicy<ProductAggregate> {
  canPublish(product: ProductAggregate): boolean;
}
