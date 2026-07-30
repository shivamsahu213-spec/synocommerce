import { Identifier } from '../..';

export class AddressIdentifier extends Identifier {}

export type AddressRole = 'BILLING' | 'SHIPPING' | 'BUSINESS' | 'WAREHOUSE' | 'RETURN' | 'PICKUP';

export interface GeoLocation {
  readonly latitude: number;
  readonly longitude: number;
}

export interface Region {
  readonly code: string;
  readonly name: string;
}

export interface Country {
  readonly iso2Code: string;
  readonly iso3Code: string;
  readonly name: string;
}

export interface State {
  readonly code: string;
  readonly name: string;
}

export interface PostalCode {
  readonly code: string;
}
