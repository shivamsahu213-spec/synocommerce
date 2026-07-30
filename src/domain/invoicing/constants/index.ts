/**
 * Invoicing Domain Constants
 *
 * @module domain/invoicing/constants
 */

import { InvoiceType } from '../types';
import { InvoiceStatus } from '../value-objects';

export const DEFAULT_INVOICE_TYPE: InvoiceType = 'STANDARD';

export const DEFAULT_INVOICE_STATUS: InvoiceStatus = 'DRAFT';

/** Default payment-due offset in days from issue date. */
export const DEFAULT_INVOICE_DUE_DAYS = 30;
