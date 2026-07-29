export interface CurrencyDefinition {
  code: string;
  symbol: string;
  precision: number;
}

export interface CurrencyFormatter {
  format(amount: number, currencyCode: string, locale: string): string;
}
