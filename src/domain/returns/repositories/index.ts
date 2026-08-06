/**
 * Returns Domain Repository Contracts
 *
 * @module domain/returns/repositories
 */

import { IBaseRepository } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { ReturnAggregate } from '../aggregates';
import { ReturnIdentifier } from '../value-objects';

export interface IReturnRepository
  extends IBaseRepository<ReturnAggregate, ReturnIdentifier>
{
  findByOrderId(orderId: OrderIdentifier): Promise<readonly ReturnAggregate[]>;
}
