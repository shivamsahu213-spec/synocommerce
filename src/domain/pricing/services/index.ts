import { Currency,Money } from '../..';

export interface IPricingCalculationContext {
  readonly productId: string;
  readonly variantId?: string;
  readonly targetCurrency: Currency;
  readonly customerGroupId?: string;
  readonly quantity: number;
}

export interface IPricingEngine {
  calculateFinalPrice(context: IPricingCalculationContext): Promise<Money>;
}
