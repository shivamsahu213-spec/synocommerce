/**
 * Shipping Domain Entities
 *
 * Child entities belonging to ShipmentAggregate. Kept persistence-independent.
 *
 * @module domain/shipping/entities
 */

import { Dimension, DomainInvariantError,Entity, Identifier, SKU, Weight } from '../..';
import { IShipmentItem, IShipmentPackage } from '../contracts';

export class ShipmentItemEntity extends Entity<Identifier> implements IShipmentItem {
  constructor(
    id: Identifier,
    public readonly sku: SKU,
    public readonly quantity: number
  ) {
    super(id);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new DomainInvariantError('Shipment item quantity must be a positive number');
    }
  }
}

export class ShipmentPackageEntity extends Entity<Identifier> implements IShipmentPackage {
  constructor(
    id: Identifier,
    public readonly weight: Weight,
    public readonly dimension: Dimension,
    public readonly items: readonly IShipmentItem[]
  ) {
    super(id);
    if (items.length === 0) {
      throw new DomainInvariantError('Shipment package must contain at least one item');
    }
  }

  public get packageId(): string {
    return this._id.value;
  }
}
