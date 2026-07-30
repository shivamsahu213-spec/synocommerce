import { Identifier, Money } from '../..';

export class CartIdentifier extends Identifier {}

export interface AppliedDiscount {
  readonly code: string;
  readonly discountAmount: Money;
  readonly description?: string;
}

export interface CartTotals {
  readonly subtotal: Money;
  readonly discountTotal: Money;
  readonly taxTotal: Money;
  readonly grandTotal: Money;
}

export interface CartSnapshot {
  readonly cartId: string;
  readonly itemCount: number;
  readonly grandTotalAmount: number;
  readonly currencyCode: string;
  readonly timestamp: Date;
}
