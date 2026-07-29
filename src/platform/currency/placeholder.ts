export interface CurrencyPlaceholder {
  module: 'currency';
  status: 'placeholder';
  description: string;
}

export const currency_placeholder: CurrencyPlaceholder = {
  module: 'currency',
  status: 'placeholder',
  description: 'Reference contract placeholder for the currency module until an implementation is registered.'
};
