import { Address } from '../..';
import { AddressIdentifier, AddressRole, GeoLocation } from '../value-objects';

export interface IAddress {
  readonly id: AddressIdentifier;
  readonly role: AddressRole;
  readonly address: Address;
  readonly geoLocation?: GeoLocation | undefined;
  readonly isDefault: boolean;
}
