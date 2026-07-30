import { Entity, SKU, Money } from '../..';
import { Identifier } from '../..';
import { ICartItem } from '../contracts';

export class CartItemEntity extends Entity<Identifier> implements ICartItem {
  private _quantity: number;
  private _unitPrice: Money;

  constructor(
    id: Identifier,
    public readonly sku: SKU,
    quantity: number,
    unitPrice: Money
  ) {
    super(id);
    this._quantity = quantity;
    this._unitPrice = unitPrice;
  }

  public get itemId(): string { return this._id.value; }
  public get quantity(): number { return this._quantity; }
  public get unitPrice(): Money { return this._unitPrice; }

  public get subtotal(): Money {
    return this._unitPrice.multiply(this._quantity);
  }

  public updateQuantity(newQuantity: number): void {
    if (newQuantity <= 0) {
      throw new Error('Item quantity must be greater than zero');
    }
    this._quantity = newQuantity;
  }
}
