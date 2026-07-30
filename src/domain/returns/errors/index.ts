/**
 * Returns Domain Errors
 *
 * @module domain/returns/errors
 */

import { DomainError } from '../..';

export class ReturnError extends DomainError {
  constructor(message: string, code: string = 'RETURN_ERROR') {
    super(message, code);
  }
}

export class ReturnWindowExpiredError extends ReturnError {
  constructor(orderId: string) {
    super(
      `Return window for order '${orderId}' has expired`,
      'RETURN_WINDOW_EXPIRED'
    );
  }
}

export class ReturnApprovalFailedError extends ReturnError {
  constructor(reason: string) {
    super(`Return approval failed: ${reason}`, 'RETURN_APPROVAL_FAILED');
  }
}

export class ReturnRejectionFailedError extends ReturnError {
  constructor(reason: string) {
    super(`Return rejection failed: ${reason}`, 'RETURN_REJECTION_FAILED');
  }
}

export class ReturnReceiveFailedError extends ReturnError {
  constructor(reason: string) {
    super(`Return receive failed: ${reason}`, 'RETURN_RECEIVE_FAILED');
  }
}

export class ReturnCompletionFailedError extends ReturnError {
  constructor(reason: string) {
    super(`Return completion failed: ${reason}`, 'RETURN_COMPLETION_FAILED');
  }
}
