import { AggregateRoot, Address } from '../..';
import { AddressIdentifier, AddressRole, GeoLocation } from '../value-objects';
import { IAddress } from '../contracts';

export class AddressAggregate extends AggregateRoot<AddressIdentifier> implements IAddress {
  private _role: AddressRole;
  private _address: Address;
  private _geoLocation?: GeoLocation;
  private _isDefault: boolean;

  constructor(
    id: AddressIdentifier,
    role: AddressRole,
    address: Address,
    geoLocation?: GeoLocation,
    isDefault = false
  ) {
    super(id);
    this._role = role;
    this._address = address;
    this._geoLocation = geoLocation;
    this._isDefault = isDefault;
  }

  public get role(): AddressRole { return this._role; }
  public get address(): Address { return this._address; }
  public get geoLocation(): GeoLocation | undefined { return this._geoLocation; }
  public get isDefault(): boolean { return this._isDefault; }

  public setAsDefault(): void { this._isDefault = true; }
  public unsetDefault(): void { this._isDefault = false; }
}

export class AddressBook {
  private _addresses: AddressAggregate[] = [];

  constructor(addresses: AddressAggregate[] = []) {
    this._addresses = [...addresses];
  }

  public get addresses(): readonly AddressAggregate[] { return [...this._addresses]; }

  public addAddress(address: AddressAggregate): void {
    if (address.isDefault) {
      this._addresses.forEach((a) => {
        if (a.role === address.role) a.unsetDefault();
      });
    }
    this._addresses.push(address);
  }
}
