import { IDomainPolicy } from '../..';
import { AddressAggregate } from '../aggregates';

export interface IAddressPolicy extends IDomainPolicy<AddressAggregate> {
  canShipTo(address: AddressAggregate): boolean;
}
