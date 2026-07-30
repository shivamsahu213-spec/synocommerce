import { IBaseRepository } from '../..';
import { OrderIdentifier, OrderNumber } from '../value-objects';
import { OrderAggregate } from '../aggregates';

export interface IOrderRepository extends IBaseRepository<OrderAggregate, OrderIdentifier> {
  findByOrderNumber(orderNumber: OrderNumber): Promise<OrderAggregate | null>;
  findByCustomerId(customerId: string): Promise<readonly OrderAggregate[]>;
}
