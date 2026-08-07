import { IBaseRepository } from '../..';
import { AddressAggregate } from '../aggregates';
import { AddressIdentifier } from '../value-objects';

export interface IAddressRepository extends IBaseRepository<AddressAggregate, AddressIdentifier> {
  findByCustomer(customerId: string): Promise<readonly AddressAggregate[]>;
}
