import { CheckoutSessionIdentifier, CheckoutStep, ShippingSelection, BillingSelection, PaymentSelection, TaxCalculation } from '../value-objects';
import { CheckoutStatus } from '../types';

export interface ICheckoutSession {
  readonly id: CheckoutSessionIdentifier;
  readonly cartId: string;
  readonly customerId?: string;
  readonly step: CheckoutStep;
  readonly status: CheckoutStatus;
  readonly shippingSelection?: ShippingSelection;
  readonly billingSelection?: BillingSelection;
  readonly paymentSelection?: PaymentSelection;
  readonly taxCalculation?: TaxCalculation;
}
