import { Currency, Money,SKU } from '../..';
import { CartState, CartType } from '../types';
import { AppliedDiscount, CartIdentifier, CartTotals } from '../value-objects';

export interface ICartItem {
  readonly itemId: string;
  readonly sku: SKU;
  readonly quantity: number;
  readonly unitPrice: Money;
  readonly subtotal: Money;
}

export interface ICart {
  readonly id: CartIdentifier;
  readonly currency: Currency;
  readonly cartType: CartType;
  readonly state: CartState;
  readonly customerId?: string | undefined;
  readonly items: readonly ICartItem[];
  readonly discounts: readonly AppliedDiscount[];
  readonly totals: CartTotals;
  readonly expiresAt?: Date | undefined;
}
