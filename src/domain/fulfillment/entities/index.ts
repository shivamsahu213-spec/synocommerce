/**
 * Fulfillment Domain Entities
 *
 * Child entities belonging to FulfillmentAggregate. Kept persistence-independent.
 *
 * @module domain/fulfillment/entities
 */

import { Entity, Identifier, SKU } from '../..';
import { WarehouseIdentifier } from '../../inventory/value-objects';
import { IFulfillmentTask } from '../contracts';

export class FulfillmentTaskEntity extends Entity<Identifier> implements IFulfillmentTask {
  private _isCompleted: boolean;

  constructor(
    id: Identifier,
    public readonly sku: SKU,
    public readonly quantity: number,
    public readonly warehouseId: WarehouseIdentifier,
    isCompleted: boolean = false
  ) {
    super(id);
    this._isCompleted = isCompleted;
  }

  public get taskId(): string {
    return this._id.value;
  }

  public get isCompleted(): boolean {
    return this._isCompleted;
  }

  public complete(): void {
    this._isCompleted = true;
  }
}
