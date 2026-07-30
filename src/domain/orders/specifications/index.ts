import { CompositeSpecification } from '../..';
import { OrderAggregate } from '../aggregates';

export class OrderCancelableSpecification extends CompositeSpecification<OrderAggregate> {
  public isSatisfiedBy(candidate: OrderAggregate): boolean {
    return candidate.status === 'PENDING' || candidate.status === 'CONFIRMED';
  }
}
