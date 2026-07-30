/**
 * Invoicing Domain Entities
 *
 * Child entities belonging to InvoiceAggregate. Kept persistence-independent.
 *
 * @module domain/invoicing/entities
 */

import { Entity, Identifier, Money } from '../..';
import { IInvoiceLine } from '../contracts';

export class InvoiceLineEntity extends Entity<Identifier> implements IInvoiceLine {
  constructor(
    id: Identifier,
    public readonly description: string,
    public readonly quantity: number,
    public readonly unitPrice: Money,
    public readonly totalAmount: Money
  ) {
    super(id);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Invoice line quantity must be a positive integer');
    }
  }

  public get lineId(): string {
    return this._id.value;
  }
}
