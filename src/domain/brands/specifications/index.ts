import { CompositeSpecification } from '../..';
import { BrandAggregate } from '../aggregates';

export class ActiveBrandSpecification extends CompositeSpecification<BrandAggregate> {
  public isSatisfiedBy(candidate: BrandAggregate): boolean {
    return candidate.isActive;
  }
}
