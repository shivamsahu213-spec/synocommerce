import { IBaseRepository } from '../..';
import { AddressIdentifier } from '../value-objects';
import { AddressAggregate } from '../aggregates';

export interface IAddressRepository extends IBaseRepository<AddressAggregate, AddressIdentifier> {
  findByCustomer(customerId: string): Promise<readonly AddressAggregate[]>;
}
