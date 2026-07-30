import { Entity, SKU } from '../..';
import { InventoryIdentifier, WarehouseIdentifier, StockLevel } from '../value-objects';
import { IInventoryItem } from '../contracts';
import { InsufficientStockError } from '../errors';

export class InventoryItemEntity extends Entity<InventoryIdentifier> implements IInventoryItem {
  private _stockLevel: StockLevel;

  constructor(
    id: InventoryIdentifier,
    public readonly sku: SKU,
    public readonly warehouseId: WarehouseIdentifier,
    stockLevel: StockLevel
  ) {
    super(id);
    this._stockLevel = stockLevel;
  }

  public get stockLevel(): StockLevel { return this._stockLevel; }

  public reserveStock(quantity: number): void {
    if (this._stockLevel.available < quantity) {
      throw new InsufficientStockError(this.sku.value, quantity, this._stockLevel.available);
    }
    this._stockLevel = new StockLevel(
      this._stockLevel.onHand,
      this._stockLevel.reserved + quantity,
      this._stockLevel.safetyStock
    );
  }

  public releaseStock(quantity: number): void {
    const newReserved = Math.max(0, this._stockLevel.reserved - quantity);
    this._stockLevel = new StockLevel(
      this._stockLevel.onHand,
      newReserved,
      this._stockLevel.safetyStock
    );
  }
}
