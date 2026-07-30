/**
 * Invoicing Domain Services (Ports)
 *
 * Interface-only domain / application ports. Concrete adapters belong
 * in the infrastructure layer.
 *
 * @module domain/invoicing/services
 */

import { OrderIdentifier } from '../../orders/value-objects';
import { InvoiceAggregate } from '../aggregates';

/** Generates tax-compliant invoices for orders. */
export interface IInvoiceGenerator {
  generateForOrder(orderId: OrderIdentifier): Promise<InvoiceAggregate>;
}

/** Validates invoice structure and totals before issue. */
export interface IInvoiceValidationService {
  validateInvoice(invoice: InvoiceAggregate): Promise<boolean>;
}
