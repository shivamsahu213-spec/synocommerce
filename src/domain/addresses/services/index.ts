import { AddressAggregate } from '../aggregates';

export interface IAddressValidationService {
  validate(address: AddressAggregate): Promise<boolean>;
}
