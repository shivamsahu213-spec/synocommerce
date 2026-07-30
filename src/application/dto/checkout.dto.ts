/**
 * Checkout DTO Contracts
 * @module application/dto/checkout.dto
 */

export interface StartCheckoutInput {
  readonly cartId: string;
  readonly customerId?: string | undefined;
}

export interface ShippingAddressInput {
  readonly addressLine1: string;
  readonly addressLine2?: string | undefined;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly countryCode: string;
}

export interface SetShippingAddressInput {
  readonly checkoutId: string;
  readonly address: ShippingAddressInput;
}

export interface CheckoutSessionDTO {
  readonly id: string;
  readonly cartId: string;
  readonly customerId?: string | undefined;
  readonly step: string;
  readonly status: string;
  readonly shippingAddress?: ShippingAddressInput | undefined;
  readonly shippingMethodId?: string | undefined;
  readonly paymentMethodId?: string | undefined;
  readonly estimatedTax: number;
  readonly total: number;
}
