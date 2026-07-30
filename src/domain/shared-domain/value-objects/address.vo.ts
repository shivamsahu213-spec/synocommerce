import { InvalidValueObjectError } from '../errors';

export interface AddressProps {
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
}

/**
 * Universal Physical/Postal Address Value Object.
 */
export class Address {
  private readonly _props: AddressProps;

  constructor(props: AddressProps) {
    if (!props.street || !props.city || !props.country || !props.postalCode) {
      throw new InvalidValueObjectError('Address requires street, city, country, and postal code');
    }
    this._props = {
      street: props.street.trim(),
      city: props.city.trim(),
      state: (props.state || '').trim(),
      postalCode: props.postalCode.trim(),
      country: props.country.trim().toUpperCase()
    };
  }

  public get street(): string { return this._props.street; }
  public get city(): string { return this._props.city; }
  public get state(): string { return this._props.state; }
  public get postalCode(): string { return this._props.postalCode; }
  public get country(): string { return this._props.country; }

  public equals(other?: Address): boolean {
    if (!other) return false;
    return (
      this._props.street === other._props.street &&
      this._props.city === other._props.city &&
      this._props.state === other._props.state &&
      this._props.postalCode === other._props.postalCode &&
      this._props.country === other._props.country
    );
  }
}
