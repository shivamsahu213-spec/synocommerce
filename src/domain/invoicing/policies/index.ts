/**
 * Invoicing Domain Policies
 *
 * @module domain/invoicing/policies
 */

import { IDomainPolicy } from '../..';
import { InvoiceAggregate } from '../aggregates';

export interface IInvoicePolicy extends IDomainPolicy<InvoiceAggregate> {
  canIssue(invoice: InvoiceAggregate): boolean;
  canCancel(invoice: InvoiceAggregate): boolean;
  canVoid(invoice: InvoiceAggregate): boolean;
}
