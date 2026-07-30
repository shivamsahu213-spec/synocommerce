/**
 * Refunds Domain Specifications
 *
 * @module domain/refunds/specifications
 */

import { CompositeSpecification } from '../..';
import { RefundAggregate } from '../aggregates';

export class RefundAllowedSpecification extends CompositeSpecification<RefundAggregate> {
  public isSatisfiedBy(candidate: RefundAggregate): boolean {
    return candidate.status === 'PENDING' || candidate.status === 'APPROVED';
  }
}

export class RefundProcessableSpecification extends CompositeSpecification<RefundAggregate> {
  public isSatisfiedBy(candidate: RefundAggregate): boolean {
    return candidate.status === 'APPROVED' && candidate.amount.amount > 0;
  }
}
