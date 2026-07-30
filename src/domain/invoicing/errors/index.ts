/**
 * Invoicing Domain Errors
 *
 * @module domain/invoicing/errors
 */

import { DomainError } from '../..';

export class InvoiceError extends DomainError {
  constructor(message: string, code: string = 'INVOICE_ERROR') {
    super(message, code);
  }
}

export class DuplicateInvoiceNumberError extends InvoiceError {
  constructor(invoiceNumber: string) {
    super(
      `Invoice number '${invoiceNumber}' already exists`,
      'DUPLICATE_INVOICE_NUMBER'
    );
  }
}

export class InvoiceIssueFailedError extends InvoiceError {
  constructor(reason: string) {
    super(`Invoice issue failed: ${reason}`, 'INVOICE_ISSUE_FAILED');
  }
}

export class InvoicePaymentFailedError extends InvoiceError {
  constructor(reason: string) {
    super(`Invoice payment failed: ${reason}`, 'INVOICE_PAYMENT_FAILED');
  }
}

export class InvoiceCancelFailedError extends InvoiceError {
  constructor(reason: string) {
    super(`Invoice cancel failed: ${reason}`, 'INVOICE_CANCEL_FAILED');
  }
}

export class InvoiceVoidFailedError extends InvoiceError {
  constructor(reason: string) {
    super(`Invoice void failed: ${reason}`, 'INVOICE_VOID_FAILED');
  }
}
