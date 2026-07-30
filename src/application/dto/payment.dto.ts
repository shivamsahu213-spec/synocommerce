/**
 * Payment DTO Contracts
 * @module application/dto/payment.dto
 */

export interface AuthorizePaymentInput {
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly providerId: string;
  readonly paymentToken: string;
  readonly customerId?: string | undefined;
}

export interface CapturePaymentInput {
  readonly paymentId: string;
  readonly amount: number;
}

export interface TransactionDTO {
  readonly transactionId: string;
  readonly action: string;
  readonly amount: number;
  readonly isSuccess: boolean;
  readonly timestamp: Date;
}

export interface PaymentDTO {
  readonly id: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: string;
  readonly providerId: string;
  readonly transactions: readonly TransactionDTO[];
}
