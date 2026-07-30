import { CompositeSpecification } from '../..';
import { CustomerAggregate } from '../aggregates';

export class CustomerActiveSpecification extends CompositeSpecification<CustomerAggregate> {
  public isSatisfiedBy(candidate: CustomerAggregate): boolean {
    return candidate.status === 'ACTIVE';
  }
}
