import { AggregateRoot, Email, PhoneNumber } from '../..';
import { CustomerIdentifier, CustomerStatus, CustomerType, CustomerProfile, CustomerPreferences, CustomerGroup } from '../value-objects';
import { ICustomer } from '../contracts';
import { CustomerSuspendedError } from '../errors';

export interface CustomerProps {
  email: Email;
  phoneNumber?: PhoneNumber | undefined;
  status?: CustomerStatus | undefined;
  customerType?: CustomerType | undefined;
  profile: CustomerProfile;
  preferences?: CustomerPreferences | undefined;
  groups?: CustomerGroup[] | undefined;
}

export class CustomerAggregate extends AggregateRoot<CustomerIdentifier> implements ICustomer {
  private _email: Email;
  private _phoneNumber?: PhoneNumber | undefined;
  private _status: CustomerStatus;
  private _customerType: CustomerType;
  private _profile: CustomerProfile;
  private _preferences: CustomerPreferences;
  private _groups: CustomerGroup[];

  constructor(id: CustomerIdentifier, props: CustomerProps) {
    super(id);
    this._email = props.email;
    this._phoneNumber = props.phoneNumber;
    this._status = props.status ?? 'PENDING';
    this._customerType = props.customerType ?? 'INDIVIDUAL';
    this._profile = props.profile;
    this._preferences = props.preferences ?? { newsletterSubscribed: false };
    this._groups = props.groups ? [...props.groups] : [];
  }

  public get email(): Email { return this._email; }
  public get phoneNumber(): PhoneNumber | undefined { return this._phoneNumber; }
  public get status(): CustomerStatus { return this._status; }
  public get customerType(): CustomerType { return this._customerType; }
  public get profile(): CustomerProfile { return this._profile; }
  public get preferences(): CustomerPreferences { return this._preferences; }
  public get groups(): readonly CustomerGroup[] { return [...this._groups]; }

  public activate(): void {
    this._status = 'ACTIVE';
  }

  public suspend(): void {
    this._status = 'SUSPENDED';
  }

  public assertActive(): void {
    if (this._status !== 'ACTIVE') {
      throw new CustomerSuspendedError(this._id.value);
    }
  }
}
