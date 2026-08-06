import { Email, PhoneNumber } from '../..';
import { CustomerGroup,CustomerIdentifier, CustomerPreferences, CustomerProfile, CustomerStatus, CustomerType } from '../value-objects';

export interface ICustomer {
  readonly id: CustomerIdentifier;
  readonly email: Email;
  readonly phoneNumber?: PhoneNumber | undefined;
  readonly status: CustomerStatus;
  readonly customerType: CustomerType;
  readonly profile: CustomerProfile;
  readonly preferences: CustomerPreferences;
  readonly groups: readonly CustomerGroup[];
}
