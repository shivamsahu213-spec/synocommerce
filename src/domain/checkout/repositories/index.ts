import { IBaseRepository } from '../..';
import { CheckoutSessionAggregate } from '../aggregates';
import { CheckoutSessionIdentifier } from '../value-objects';

export interface ICheckoutSessionRepository extends IBaseRepository<CheckoutSessionAggregate, CheckoutSessionIdentifier> {
  findByCartId(cartId: string): Promise<CheckoutSessionAggregate | null>;
}
