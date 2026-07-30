/**
 * Promotion & Coupon Engine Module
 * @module modules/commerce-engine/promotions/promotion-engine
 */

export type PromotionType = 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';

export interface PromotionRule {
  readonly code: string;
  readonly type: PromotionType;
  readonly value: number; // percentage e.g. 15 or fixed amount e.g. 20
  readonly minSubtotal?: number | undefined;
  readonly isStackable?: boolean | undefined;
  readonly expiresAt?: Date | undefined;
}

export interface PromotionResult {
  readonly code: string;
  readonly discountAmount: number;
  readonly isFreeShipping: boolean;
}

export class PromotionEngine {
  private readonly _promotions = new Map<string, PromotionRule>();

  public registerPromotion(rule: PromotionRule): void {
    this._promotions.set(rule.code.toUpperCase(), rule);
  }

  public applyCoupon(code: string, subtotal: number): PromotionResult {
    const promo = this._promotions.get(code.toUpperCase());
    if (!promo) {
      throw new Error(`Invalid promotion coupon code: ${code}`);
    }

    if (promo.expiresAt && new Date() > promo.expiresAt) {
      throw new Error(`Promotion coupon '${code}' has expired`);
    }

    if (promo.minSubtotal !== undefined && subtotal < promo.minSubtotal) {
      throw new Error(`Subtotal must be at least $${promo.minSubtotal} to use coupon '${code}'`);
    }

    let discountAmount = 0;
    let isFreeShipping = false;

    if (promo.type === 'PERCENTAGE') {
      discountAmount = Math.round((subtotal * (promo.value / 100)) * 100) / 100;
    } else if (promo.type === 'FIXED_AMOUNT') {
      discountAmount = Math.min(subtotal, promo.value);
    } else if (promo.type === 'FREE_SHIPPING') {
      isFreeShipping = true;
    }

    return {
      code: promo.code,
      discountAmount,
      isFreeShipping,
    };
  }
}
