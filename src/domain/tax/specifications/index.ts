/**
 * Tax Domain Specifications
 *
 * @module domain/tax/specifications
 */

import { Address, CompositeSpecification } from '../..';
import { TaxRateAggregate } from '../aggregates';

export class TaxApplicableSpecification extends CompositeSpecification<Address> {
  public isSatisfiedBy(candidate: Address): boolean {
    return Boolean(candidate.country);
  }
}

export class TaxRateActiveSpecification extends CompositeSpecification<TaxRateAggregate> {
  public isSatisfiedBy(candidate: TaxRateAggregate): boolean {
    return candidate.isActive;
  }
}
