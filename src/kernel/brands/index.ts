/**
 * Multi-Brand, Region, Currency, Locale Contracts
 * @module kernel/brands
 */

export interface IBrandContext {
  readonly brandId: string;
  readonly tenantId: string;
  readonly name: string;
  readonly code: string;
}

export interface IRegionContext {
  readonly regionId: string;
  readonly name: string;
  readonly countryCode: string;
  readonly defaultCurrency: string;
  readonly defaultLocale: string;
}

export interface ICurrencyContext {
  readonly code: string;
  readonly symbol: string;
  readonly precision: number;
}

export interface ILocaleContext {
  readonly code: string;
  readonly name: string;
  readonly isRtl: boolean;
}
