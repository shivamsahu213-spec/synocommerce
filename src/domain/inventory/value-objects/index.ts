import { Identifier } from '../..';

export class InventoryIdentifier extends Identifier {}
export class ReservationIdentifier extends Identifier {}
export class WarehouseIdentifier extends Identifier {}

export class StockLevel {
  constructor(
    public readonly onHand: number,
    public readonly reserved: number,
    public readonly safetyStock: number = 0
  ) {
    if (onHand < 0 || reserved < 0 || safetyStock < 0) {
      throw new Error('Stock levels cannot be negative');
    }
  }

  public get available(): number {
    return Math.max(0, this.onHand - this.reserved - this.safetyStock);
  }
}
