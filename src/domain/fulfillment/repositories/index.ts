/**
 * Fulfillment Domain Repository Contracts
 *
 * @module domain/fulfillment/repositories
 */

import { IBaseRepository } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { FulfillmentAggregate } from '../aggregates';
import { FulfillmentIdentifier } from '../value-objects';

export interface IFulfillmentRepository
  extends IBaseRepository<FulfillmentAggregate, FulfillmentIdentifier>
{
  findByOrderId(orderId: OrderIdentifier): Promise<FulfillmentAggregate | null>;
}
