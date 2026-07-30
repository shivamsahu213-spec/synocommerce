import { Identifier, Money, Currency, Percentage, DateRange } from '../..';
import { PriceRuleType, TaxCalculationStrategy } from '../types';

export interface IBasePrice {
  readonly amount: Money;
}

export interface ISalePrice {
  readonly amount: Money;
  readonly dateRange?: DateRange;
}

export interface ICompareAtPrice {
  readonly amount: Money;
}

export interface IPriceBook {
  readonly id: Identifier;
  readonly code: string;
  readonly currency: Currency;
  readonly isActive: boolean;
}

export interface IPriceRule {
  readonly id: Identifier;
  readonly name: string;
  readonly ruleType: PriceRuleType;
  readonly discountValue: number;
  readonly dateRange?: DateRange;
}

export interface ITaxClass {
  readonly id: Identifier;
  readonly code: string;
  readonly rate: Percentage;
  readonly strategy: TaxCalculationStrategy;
}

export interface ICurrencyConversion {
  readonly fromCurrency: Currency;
  readonly toCurrency: Currency;
  readonly rate: number;
}
