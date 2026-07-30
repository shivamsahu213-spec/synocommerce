import { DomainError } from '../..';

export class PricingError extends DomainError {
  constructor(message: string, code: string = 'PRICING_ERROR') {
    super(message, code);
  }
}

export class CurrencyConversionError extends PricingError {
  constructor(fromCurrency: string, toCurrency: string) {
    super(`No conversion rate found from ${fromCurrency} to ${toCurrency}`, 'CURRENCY_CONVERSION_NOT_FOUND');
  }
}
