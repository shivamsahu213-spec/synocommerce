import { Email,IBaseRepository } from '../..';
import { CustomerAggregate } from '../aggregates';
import { CustomerIdentifier } from '../value-objects';

export interface ICustomerRepository extends IBaseRepository<CustomerAggregate, CustomerIdentifier> {
  findByEmail(email: Email): Promise<CustomerAggregate | null>;
}
