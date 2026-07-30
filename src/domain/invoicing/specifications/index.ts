/**
 * Invoicing Domain Specifications
 *
 * @module domain/invoicing/specifications
 */

import { CompositeSpecification } from '../..';
import { InvoiceAggregate } from '../aggregates';

export class ValidInvoiceSpecification extends CompositeSpecification<InvoiceAggregate> {
  public isSatisfiedBy(candidate: InvoiceAggregate): boolean {
    return (
      candidate.status !== 'CANCELLED' &&
      candidate.status !== 'VOID' &&
      candidate.totals.grandTotal.amount > 0 &&
      candidate.lines.length > 0
    );
  }
}

export class InvoiceIssuableSpecification extends CompositeSpecification<InvoiceAggregate> {
  public isSatisfiedBy(candidate: InvoiceAggregate): boolean {
    return (
      candidate.status === 'DRAFT' &&
      candidate.lines.length > 0 &&
      candidate.totals.grandTotal.amount > 0
    );
  }
}
