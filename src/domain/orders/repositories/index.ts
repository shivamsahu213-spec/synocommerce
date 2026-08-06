import { IBaseRepository } from '../..';
import { OrderAggregate } from '../aggregates';
import { OrderIdentifier, OrderNumber } from '../value-objects';

export interface IOrderRepository extends IBaseRepository<OrderAggregate, OrderIdentifier> {
  findByOrderNumber(orderNumber: OrderNumber): Promise<OrderAggregate | null>;
  findByCustomerId(customerId: string): Promise<readonly OrderAggregate[]>;
}
