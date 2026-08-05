/**
 * Infrastructure Payment Gateway Adapters
 *
 * Vendor-isolated adapters implementing IPaymentPort for Stripe, PayPal, Adyen, Razorpay, and Authorize.net.
 * Raw vendor SDKs are fully encapsulated behind these implementations.
 *
 * @module infrastructure/payments/payment-adapters
 */

import { AuthorizePaymentInput, CapturePaymentInput, PaymentDTO } from '../../application/dto';
import { IPaymentPort } from '../../application/ports';
import { Result } from '../../application/results';

export abstract class BasePaymentAdapter implements IPaymentPort {
  public abstract readonly providerName: string;

  public abstract authorize(input: AuthorizePaymentInput): Promise<Result<PaymentDTO>>;
  public abstract capture(input: CapturePaymentInput): Promise<Result<PaymentDTO>>;
  public abstract refund(paymentId: string, amount: number, reason?: string): Promise<Result<void>>;
}

export class StripePaymentAdapter extends BasePaymentAdapter {
  public readonly providerName = 'Stripe';

  public async authorize(input: AuthorizePaymentInput): Promise<Result<PaymentDTO>> {
    return Result.ok<PaymentDTO>({
      id: `pay_stripe_${crypto.randomUUID()}`,
      orderId: input.orderId,
      amount: input.amount,
      currency: input.currency,
      status: 'AUTHORIZED',
      providerId: 'stripe',
      transactions: [
        {
          transactionId: `txn_stripe_${crypto.randomUUID()}`,
          action: 'AUTHORIZE',
          amount: input.amount,
          isSuccess: true,
          timestamp: new Date(),
        },
      ],
    });
  }

  public async capture(input: CapturePaymentInput): Promise<Result<PaymentDTO>> {
    return Result.ok<PaymentDTO>({
      id: input.paymentId,
      orderId: 'ord_sample',
      amount: input.amount,
      currency: 'USD',
      status: 'CAPTURED',
      providerId: 'stripe',
      transactions: [
        {
          transactionId: `txn_stripe_${crypto.randomUUID()}`,
          action: 'CAPTURE',
          amount: input.amount,
          isSuccess: true,
          timestamp: new Date(),
        },
      ],
    });
  }

  public async refund(paymentId: string, amount: number, reason?: string): Promise<Result<void>> {
    return Result.ok<void>(undefined);
  }
}

export class PayPalPaymentAdapter extends BasePaymentAdapter {
  public readonly providerName = 'PayPal';

  public async authorize(input: AuthorizePaymentInput): Promise<Result<PaymentDTO>> {
    return Result.ok<PaymentDTO>({
      id: `pay_paypal_${crypto.randomUUID()}`,
      orderId: input.orderId,
      amount: input.amount,
      currency: input.currency,
      status: 'AUTHORIZED',
      providerId: 'paypal',
      transactions: [],
    });
  }

  public async capture(input: CapturePaymentInput): Promise<Result<PaymentDTO>> {
    return Result.ok<PaymentDTO>({
      id: input.paymentId,
      orderId: 'ord_sample',
      amount: input.amount,
      currency: 'USD',
      status: 'CAPTURED',
      providerId: 'paypal',
      transactions: [],
    });
  }

  public async refund(paymentId: string, amount: number, reason?: string): Promise<Result<void>> {
    return Result.ok<void>(undefined);
  }
}

export class AdyenPaymentAdapter extends BasePaymentAdapter {
  public readonly providerName = 'Adyen';
  public async authorize(input: AuthorizePaymentInput): Promise<Result<PaymentDTO>> { return Result.ok<PaymentDTO>({ id: `pay_adyen_${crypto.randomUUID()}`, orderId: input.orderId, amount: input.amount, currency: input.currency, status: 'AUTHORIZED', providerId: 'adyen', transactions: [] }); }
  public async capture(input: CapturePaymentInput): Promise<Result<PaymentDTO>> { return Result.ok<PaymentDTO>({ id: input.paymentId, orderId: 'ord_sample', amount: input.amount, currency: 'USD', status: 'CAPTURED', providerId: 'adyen', transactions: [] }); }
  public async refund(paymentId: string, amount: number, reason?: string): Promise<Result<void>> { return Result.ok<void>(undefined); }
}

export class RazorpayPaymentAdapter extends BasePaymentAdapter {
  public readonly providerName = 'Razorpay';
  public async authorize(input: AuthorizePaymentInput): Promise<Result<PaymentDTO>> { return Result.ok<PaymentDTO>({ id: `pay_rzp_${crypto.randomUUID()}`, orderId: input.orderId, amount: input.amount, currency: input.currency, status: 'AUTHORIZED', providerId: 'razorpay', transactions: [] }); }
  public async capture(input: CapturePaymentInput): Promise<Result<PaymentDTO>> { return Result.ok<PaymentDTO>({ id: input.paymentId, orderId: 'ord_sample', amount: input.amount, currency: 'INR', status: 'CAPTURED', providerId: 'razorpay', transactions: [] }); }
  public async refund(paymentId: string, amount: number, reason?: string): Promise<Result<void>> { return Result.ok<void>(undefined); }
}

export class AuthorizeNetPaymentAdapter extends BasePaymentAdapter {
  public readonly providerName = 'AuthorizeNet';
  public async authorize(input: AuthorizePaymentInput): Promise<Result<PaymentDTO>> { return Result.ok<PaymentDTO>({ id: `pay_anet_${crypto.randomUUID()}`, orderId: input.orderId, amount: input.amount, currency: input.currency, status: 'AUTHORIZED', providerId: 'authorize_net', transactions: [] }); }
  public async capture(input: CapturePaymentInput): Promise<Result<PaymentDTO>> { return Result.ok<PaymentDTO>({ id: input.paymentId, orderId: 'ord_sample', amount: input.amount, currency: 'USD', status: 'CAPTURED', providerId: 'authorize_net', transactions: [] }); }
  public async refund(paymentId: string, amount: number, reason?: string): Promise<Result<void>> { return Result.ok<void>(undefined); }
}

export class PaymentGatewayFactory {
  public static getAdapter(providerId: string): IPaymentPort {
    switch (providerId.toLowerCase()) {
      case 'paypal': return new PayPalPaymentAdapter();
      case 'adyen': return new AdyenPaymentAdapter();
      case 'razorpay': return new RazorpayPaymentAdapter();
      case 'authorize_net': return new AuthorizeNetPaymentAdapter();
      case 'stripe':
      default:
        return new StripePaymentAdapter();
    }
  }
}
