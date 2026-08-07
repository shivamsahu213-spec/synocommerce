/**
 * Cart Engine Module
 *
 * Implements Guest & Customer Cart, Merging, Validation, Coupon application, and Totals.
 *
 * @module modules/commerce-engine/cart/cart-engine
 */

import crypto from 'node:crypto';

import { PricingEngine } from '../pricing';
import { PromotionEngine } from '../promotions';
import { TaxEngine } from '../tax';

export interface CartItem {
  readonly sku: string;
  readonly name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartTotals {
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly taxTotal: number;
  readonly shippingEstimate: number;
  readonly grandTotal: number;
}

export class CartAggregate {
  public readonly id: string;
  public customerId?: string | undefined;
  private readonly _items = new Map<string, CartItem>();
  private _appliedCoupon?: string | undefined;

  constructor(id: string = `cart_${crypto.randomUUID()}`, customerId?: string) {
    this.id = id;
    this.customerId = customerId;
  }

  public get items(): readonly CartItem[] {
    return Array.from(this._items.values());
  }

  public get appliedCoupon(): string | undefined {
    return this._appliedCoupon;
  }

  public addItem(item: CartItem): void {
    const existing = this._items.get(item.sku);
    if (existing) {
      existing.quantity += item.quantity;
      existing.totalPrice = Math.round(existing.quantity * existing.unitPrice * 100) / 100;
    } else {
      this._items.set(item.sku, { ...item });
    }
  }

  public updateQuantity(sku: string, quantity: number): void {
    if (quantity <= 0) {
      this._items.delete(sku);
    } else {
      const item = this._items.get(sku);
      if (item) {
        item.quantity = quantity;
        item.totalPrice = Math.round(quantity * item.unitPrice * 100) / 100;
      }
    }
  }

  public removeItem(sku: string): void {
    this._items.delete(sku);
  }

  public applyCoupon(code: string): void {
    this._appliedCoupon = code;
  }

  public merge(otherCart: CartAggregate): void {
    for (const item of otherCart.items) {
      this.addItem(item);
    }
    if (otherCart.appliedCoupon) {
      this._appliedCoupon = otherCart.appliedCoupon;
    }
  }
}

export class CartEngine {
  constructor(
    private readonly _pricingEngine: PricingEngine,
    private readonly _promotionEngine: PromotionEngine,
    private readonly _taxEngine: TaxEngine
  ) {}

  public calculateTotals(cart: CartAggregate, regionCode = 'US-CA'): CartTotals {
    const subtotal = Math.round(
      cart.items.reduce((sum, item) => sum + item.totalPrice, 0) * 100
    ) / 100;

    let discountTotal = 0;
    let isFreeShipping = false;

    if (cart.appliedCoupon) {
      try {
        const promoResult = this._promotionEngine.applyCoupon(cart.appliedCoupon, subtotal);
        discountTotal = promoResult.discountAmount;
        isFreeShipping = promoResult.isFreeShipping;
      } catch (err) {
        // Invalid or expired coupon
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discountTotal);
    const taxCalc = this._taxEngine.calculateTax(discountedSubtotal, regionCode);
    const shippingEstimate = isFreeShipping ? 0 : 9.99;

    const grandTotal = Math.round((discountedSubtotal + taxCalc.taxAmount + shippingEstimate) * 100) / 100;

    return {
      subtotal,
      discountTotal,
      taxTotal: taxCalc.taxAmount,
      shippingEstimate,
      grandTotal,
    };
  }
}
