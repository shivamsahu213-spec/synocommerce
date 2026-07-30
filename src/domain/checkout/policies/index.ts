import { IDomainPolicy } from '../..';
import { CheckoutSessionAggregate } from '../aggregates';

export interface ICheckoutPolicy extends IDomainPolicy<CheckoutSessionAggregate> {
  canComplete(session: CheckoutSessionAggregate): boolean;
}
