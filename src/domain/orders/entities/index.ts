import { Entity, Identifier, Money,SKU } from '../..';
import { IOrderItem } from '../contracts';

export class OrderItemEntity extends Entity<Identifier> implements IOrderItem {
  constructor(
    id: Identifier,
    public readonly sku: SKU,
    public readonly title: string,
    public readonly quantity: number,
    public readonly unitPrice: Money
  ) {
    super(id);
  }

  public get itemId(): string { return this._id.value; }
  public get subtotal(): Money { return this.unitPrice.multiply(this.quantity); }
}
