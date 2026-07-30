import {
  CheckoutSessionIdentifier,
  CheckoutStep,
  ShippingSelection,
  BillingSelection,
  PaymentSelection,
  CheckoutTaxEstimate,
} from '../value-objects';
import { CheckoutStatus } from '../types';

export interface ICheckoutSession {
  readonly id: CheckoutSessionIdentifier;
  readonly cartId: string;
  readonly customerId?: string | undefined;
  readonly step: CheckoutStep;
  readonly status: CheckoutStatus;
  readonly shippingSelection?: ShippingSelection | undefined;
  readonly billingSelection?: BillingSelection | undefined;
  readonly paymentSelection?: PaymentSelection | undefined;
  readonly taxCalculation?: CheckoutTaxEstimate | undefined;
}
