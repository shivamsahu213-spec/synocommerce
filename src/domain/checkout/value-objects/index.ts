import { Identifier, Address, Money } from '../..';

export class CheckoutSessionIdentifier extends Identifier {}

export type CheckoutStep = 'INFORMATION' | 'SHIPPING' | 'BILLING' | 'PAYMENT' | 'REVIEW' | 'COMPLETED';

export interface ShippingSelection {
  readonly shippingMethodId: string;
  readonly shippingAddress: Address;
  readonly shippingCost: Money;
}

export interface BillingSelection {
  readonly billingAddress: Address;
  readonly sameAsShipping: boolean;
}

export interface PaymentSelection {
  readonly paymentProviderId: string;
  readonly paymentMethodType: string;
}

/**
 * Checkout-session tax estimate snapshot.
 * Distinct from the canonical TaxCalculation owned by the tax bounded context.
 */
export interface CheckoutTaxEstimate {
  readonly totalTax: Money;
  readonly taxRate: number;
  readonly isTaxInclusive: boolean;
}

export interface CheckoutValidation {
  readonly isValid: boolean;
  readonly errors: readonly string[];
}
