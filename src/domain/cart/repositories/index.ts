import { IBaseRepository } from '../..';
import { CartAggregate } from '../aggregates';
import { CartIdentifier } from '../value-objects';

export interface ICartRepository extends IBaseRepository<CartAggregate, CartIdentifier> {
  findByCustomer(customerId: string): Promise<CartAggregate | null>;
}
