import { IBaseRepository } from '../..';
import { CheckoutSessionIdentifier } from '../value-objects';
import { CheckoutSessionAggregate } from '../aggregates';

export interface ICheckoutSessionRepository extends IBaseRepository<CheckoutSessionAggregate, CheckoutSessionIdentifier> {
  findByCartId(cartId: string): Promise<CheckoutSessionAggregate | null>;
}
