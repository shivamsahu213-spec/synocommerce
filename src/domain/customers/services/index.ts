import { CustomerAggregate } from '../aggregates';

export interface ICustomerVerificationService {
  verifyIdentity(customer: CustomerAggregate): Promise<boolean>;
}
