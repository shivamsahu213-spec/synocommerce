/**
 * Returns Domain Entities
 *
 * Child entities belonging to ReturnAggregate. Kept persistence-independent.
 *
 * @module domain/returns/entities
 */

import { Entity, Identifier, SKU } from '../..';
import { IReturnItem } from '../contracts';
import { ReturnReason } from '../value-objects';

export class ReturnItemEntity extends Entity<Identifier> implements IReturnItem {
  constructor(
    id: Identifier,
    public readonly sku: SKU,
    public readonly quantity: number,
    public readonly reason: ReturnReason
  ) {
    super(id);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Return item quantity must be a positive integer');
    }
  }

  public get itemId(): string {
    return this._id.value;
  }
}
