import { CompositeSpecification } from '../..';
import { CartAggregate } from '../aggregates';

export class CartNotExpiredSpecification extends CompositeSpecification<CartAggregate> {
  public isSatisfiedBy(candidate: CartAggregate): boolean {
    if (!candidate.expiresAt) return true;
    return candidate.expiresAt.getTime() > Date.now();
  }
}
