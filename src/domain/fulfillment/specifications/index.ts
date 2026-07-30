/**
 * Fulfillment Domain Specifications
 *
 * @module domain/fulfillment/specifications
 */

import { CompositeSpecification } from '../..';
import { FulfillmentAggregate } from '../aggregates';

export class FulfillmentReadySpecification extends CompositeSpecification<FulfillmentAggregate> {
  public isSatisfiedBy(candidate: FulfillmentAggregate): boolean {
    return candidate.status === 'CREATED' || candidate.status === 'ALLOCATED';
  }
}

export class FulfillmentCompletedSpecification extends CompositeSpecification<FulfillmentAggregate> {
  public isSatisfiedBy(candidate: FulfillmentAggregate): boolean {
    return candidate.status === 'COMPLETED' || candidate.status === 'SHIPPED';
  }
}
