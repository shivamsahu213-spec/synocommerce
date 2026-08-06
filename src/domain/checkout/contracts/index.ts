import { CheckoutStatus } from '../types';
import {
  BillingSelection,
  CheckoutSessionIdentifier,
  CheckoutStep,
  CheckoutTaxEstimate,
  PaymentSelection,
  ShippingSelection,
} from '../value-objects';

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
