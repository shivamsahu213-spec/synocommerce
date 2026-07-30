import { IDomainPolicy } from '../..';
import { OrderAggregate } from '../aggregates';

export interface IOrderPolicy extends IDomainPolicy<OrderAggregate> {
  canCancel(order: OrderAggregate): boolean;
  canRefund(order: OrderAggregate): boolean;
}
