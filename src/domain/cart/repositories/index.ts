import { IBaseRepository } from '../..';
import { CartIdentifier } from '../value-objects';
import { CartAggregate } from '../aggregates';

export interface ICartRepository extends IBaseRepository<CartAggregate, CartIdentifier> {
  findByCustomer(customerId: string): Promise<CartAggregate | null>;
}
