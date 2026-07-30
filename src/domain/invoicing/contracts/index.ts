/**
 * Invoicing Domain Contracts
 *
 * @module domain/invoicing/contracts
 */

import { Money } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import {
  InvoiceIdentifier,
  InvoiceNumber,
  InvoiceStatus,
  InvoiceTotals,
} from '../value-objects';

/** Line item on an invoice. */
export interface IInvoiceLine {
  readonly lineId: string;
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: Money;
  readonly totalAmount: Money;
}

/** Aggregate root contract for the invoicing bounded context. */
export interface IInvoice {
  readonly id: InvoiceIdentifier;
  readonly invoiceNumber: InvoiceNumber;
  readonly orderId: OrderIdentifier;
  readonly customerId: string;
  readonly status: InvoiceStatus;
  readonly lines: readonly IInvoiceLine[];
  readonly totals: InvoiceTotals;
  readonly issuedAt?: Date | undefined;
  readonly dueDate?: Date | undefined;
}
