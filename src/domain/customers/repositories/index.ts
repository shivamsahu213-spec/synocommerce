import { IBaseRepository, Email } from '../..';
import { CustomerIdentifier } from '../value-objects';
import { CustomerAggregate } from '../aggregates';

export interface ICustomerRepository extends IBaseRepository<CustomerAggregate, CustomerIdentifier> {
  findByEmail(email: Email): Promise<CustomerAggregate | null>;
}
