import { Email, PhoneNumber } from '../..';
import { CustomerIdentifier, CustomerStatus, CustomerType, CustomerProfile, CustomerPreferences, CustomerGroup } from '../value-objects';

export interface ICustomer {
  readonly id: CustomerIdentifier;
  readonly email: Email;
  readonly phoneNumber?: PhoneNumber;
  readonly status: CustomerStatus;
  readonly customerType: CustomerType;
  readonly profile: CustomerProfile;
  readonly preferences: CustomerPreferences;
  readonly groups: readonly CustomerGroup[];
}
