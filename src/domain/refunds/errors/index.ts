/**
 * Refunds Domain Errors
 *
 * @module domain/refunds/errors
 */

import { DomainError } from '../..';

export class RefundError extends DomainError {
  constructor(message: string, code: string = 'REFUND_ERROR') {
    super(message, code);
  }
}

export class ExceededRefundAmountError extends RefundError {
  constructor(requested: number, maximum: number) {
    super(
      `Refund amount ${requested} exceeds maximum refundable amount of ${maximum}`,
      'EXCEEDED_REFUND_AMOUNT'
    );
  }
}

export class RefundApprovalFailedError extends RefundError {
  constructor(reason: string) {
    super(`Refund approval failed: ${reason}`, 'REFUND_APPROVAL_FAILED');
  }
}

export class RefundProcessFailedError extends RefundError {
  constructor(reason: string) {
    super(`Refund processing failed: ${reason}`, 'REFUND_PROCESS_FAILED');
  }
}

export class RefundRejectionFailedError extends RefundError {
  constructor(reason: string) {
    super(`Refund rejection failed: ${reason}`, 'REFUND_REJECTION_FAILED');
  }
}
