import { IDomainPolicy } from '../..';
import { CustomerAggregate } from '../aggregates';

export interface ICustomerPolicy extends IDomainPolicy<CustomerAggregate> {
  canPlaceOrder(customer: CustomerAggregate): boolean;
}
