import { AggregateRoot, Currency, Money } from '../..';
import { CartIdentifier, AppliedDiscount, CartTotals } from '../value-objects';
import { ICart } from '../contracts';
import { CartItemEntity } from '../entities';
import { CartState, CartType } from '../types';

export class CartAggregate extends AggregateRoot<CartIdentifier> implements ICart {
  private _currency: Currency;
  private _cartType: CartType;
  private _state: CartState;
  private _customerId?: string;
  private _items: CartItemEntity[];
  private _discounts: AppliedDiscount[];
  private _expiresAt?: Date;

  constructor(
    id: CartIdentifier,
    currency: Currency,
    cartType: CartType = 'GUEST',
    customerId?: string,
    items: CartItemEntity[] = [],
    discounts: AppliedDiscount[] = [],
    expiresAt?: Date
  ) {
    super(id);
    this._currency = currency;
    this._cartType = cartType;
    this._state = 'ACTIVE';
    this._customerId = customerId;
    this._items = [...items];
    this._discounts = [...discounts];
    this._expiresAt = expiresAt;
  }

  public get currency(): Currency { return this._currency; }
  public get cartType(): CartType { return this._cartType; }
  public get state(): CartState { return this._state; }
  public get customerId(): string | undefined { return this._customerId; }
  public get items(): readonly CartItemEntity[] { return [...this._items]; }
  public get discounts(): readonly AppliedDiscount[] { return [...this._discounts]; }
  public get expiresAt(): Date | undefined { return this._expiresAt; }

  public get totals(): CartTotals {
    let subtotalAmount = 0;
    this._items.forEach((item) => {
      subtotalAmount += item.subtotal.amount;
    });
    const subtotal = new Money(subtotalAmount, this._currency);

    let discountTotalAmount = 0;
    this._discounts.forEach((d) => {
      discountTotalAmount += d.discountAmount.amount;
    });
    const discountTotal = new Money(discountTotalAmount, this._currency);
    const taxTotal = new Money(0, this._currency);
    const grandTotal = new Money(Math.max(0, subtotalAmount - discountTotalAmount), this._currency);

    return { subtotal, discountTotal, taxTotal, grandTotal };
  }

  public addItem(item: CartItemEntity): void {
    const existing = this._items.find((i) => i.sku.equals(item.sku));
    if (existing) {
      existing.updateQuantity(existing.quantity + item.quantity);
    } else {
      this._items.push(item);
    }
  }

  public removeItem(itemId: string): void {
    this._items = this._items.filter((i) => i.itemId !== itemId);
  }

  public applyCoupon(discount: AppliedDiscount): void {
    this._discounts.push(discount);
  }
}
