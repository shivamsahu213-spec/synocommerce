/**
 * Payments Domain Errors
 *
 * @module domain/payments/errors
 */

import { DomainError } from '../..';

export class PaymentError extends DomainError {
  constructor(message: string, code: string = 'PAYMENT_ERROR') {
    super(message, code);
  }
}

export class PaymentAuthorizationFailedError extends PaymentError {
  constructor(reason: string) {
    super(`Payment authorization failed: ${reason}`, 'PAYMENT_AUTHORIZATION_FAILED');
  }
}

export class PaymentCaptureFailedError extends PaymentError {
  constructor(reason: string) {
    super(`Payment capture failed: ${reason}`, 'PAYMENT_CAPTURE_FAILED');
  }
}

export class PaymentVoidFailedError extends PaymentError {
  constructor(reason: string) {
    super(`Payment void failed: ${reason}`, 'PAYMENT_VOID_FAILED');
  }
}

export class PaymentRefundFailedError extends PaymentError {
  constructor(reason: string) {
    super(`Payment refund failed: ${reason}`, 'PAYMENT_REFUND_FAILED');
  }
}
