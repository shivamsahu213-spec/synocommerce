import { CompositeSpecification } from '../..';
import { ProductAggregate } from '../aggregates';

export class PublishedProductSpecification extends CompositeSpecification<ProductAggregate> {
  public isSatisfiedBy(candidate: ProductAggregate): boolean {
    return candidate.state === 'PUBLISHED';
  }
}
