/**
 * SynoCommerce Provider Extension SDK
 * @module tools/sdk/provider-sdk
 */

export interface PaymentAuthorizeRequest {
  amount: number;
  currency: string;
}

export interface PaymentAuthorizeResponse {
  success: boolean;
  transactionId: string;
}

export interface IPaymentProvider {
  readonly providerId: string;
  authorize(req: PaymentAuthorizeRequest): Promise<PaymentAuthorizeResponse>;
}

export interface IShippingProvider {
  readonly providerId: string;
  calculateRates(subtotal: number): Promise<Array<{ name: string; cost: number }>>;
}

export interface ITaxProvider {
  readonly providerId: string;
  calculateTax(amount: number, regionCode: string): Promise<{ taxAmount: number; rate: number }>;
}
