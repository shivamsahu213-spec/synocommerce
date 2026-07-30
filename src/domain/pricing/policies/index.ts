import { IDomainPolicy } from '../..';
import { IPricingCalculationContext } from '../services';

export interface IPricingPolicy extends IDomainPolicy<IPricingCalculationContext> {
  canApply(context: IPricingCalculationContext): boolean;
}

export interface IDiscountPolicy extends IDomainPolicy<IPricingCalculationContext> {
  canCombineDiscounts(discountIds: readonly string[]): boolean;
}
