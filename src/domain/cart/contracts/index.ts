import { Currency, SKU, Money } from '../..';
import { CartIdentifier, AppliedDiscount, CartTotals } from '../value-objects';
import { CartState, CartType } from '../types';

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
