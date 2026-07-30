/**
 * Refunds Domain Entities
 *
 * Child entities belonging to RefundAggregate. Kept persistence-independent.
 *
 * @module domain/refunds/entities
 */

import { Entity, Identifier, Money, SKU } from '../..';
import { IRefundLine } from '../contracts';

export class RefundLineEntity extends Entity<Identifier> implements IRefundLine {
  constructor(
    id: Identifier,
    public readonly sku: SKU,
    public readonly quantity: number,
    public readonly refundAmount: Money
  ) {
    super(id);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Refund line quantity must be a positive integer');
    }
  }

  public get lineId(): string {
    return this._id.value;
  }
}
