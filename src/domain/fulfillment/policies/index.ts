/**
 * Fulfillment Domain Policies
 *
 * @module domain/fulfillment/policies
 */

import { IDomainPolicy } from '../..';
import { FulfillmentAggregate } from '../aggregates';

export interface IFulfillmentPolicy extends IDomainPolicy<FulfillmentAggregate> {
  canStartFulfillment(fulfillment: FulfillmentAggregate): boolean;
  canAllocate(fulfillment: FulfillmentAggregate): boolean;
  canComplete(fulfillment: FulfillmentAggregate): boolean;
}
