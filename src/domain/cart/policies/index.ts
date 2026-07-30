import { IDomainPolicy } from '../..';
import { CartAggregate } from '../aggregates';

export interface ICartPolicy extends IDomainPolicy<CartAggregate> {
  canCheckout(cart: CartAggregate): boolean;
}
