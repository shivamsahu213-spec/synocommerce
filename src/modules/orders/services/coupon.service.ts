import { couponRepository, CouponRepository } from '../repositories/coupon.repository';
import { ValidationError, NotFoundError } from '../../../common/errors';
import { CouponType } from '@prisma/client';

export interface CouponDiscountResult {
  couponId: string;
  code: string;
  type: CouponType;
  discountAmount: number;
  isFreeShipping: boolean;
}

export class CouponService {
  constructor(private repo: CouponRepository = couponRepository) {}

  async validateAndCalculateCoupon(params: {
    tenantId: string;
    code: string;
    subtotal: number;
    shippingFee: number;
    customerId?: string;
    items?: Array<{ quantity: number; unitPrice: number }>;
  }): Promise<CouponDiscountResult> {
    const { tenantId, code, subtotal, shippingFee, customerId, items } = params;

    const coupon = await this.repo.findCouponByCode(tenantId, code);
    if (!coupon) {
      throw new NotFoundError(`Coupon '${code}' not found`);
    }

    if (!coupon.isActive) {
      throw new ValidationError(`Coupon '${code}' is inactive`);
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      throw new ValidationError(`Coupon '${code}' has expired`);
    }

    if (coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit) {
      throw new ValidationError(`Coupon '${code}' usage limit reached`);
    }

    if (coupon.minOrderAmount !== null && subtotal < Number(coupon.minOrderAmount)) {
      throw new ValidationError(
        `Minimum order subtotal of $${Number(coupon.minOrderAmount)} required to apply coupon '${code}'`,
      );
    }

    if (coupon.customerEligibility && Array.isArray(coupon.customerEligibility) && coupon.customerEligibility.length > 0) {
      if (!customerId || !coupon.customerEligibility.includes(customerId)) {
        throw new ValidationError(`Customer is not eligible to use coupon '${code}'`);
      }
    }

    let discountAmount = 0;
    let isFreeShipping = false;

    switch (coupon.type) {
      case CouponType.PERCENTAGE: {
        const percent = Number(coupon.value);
        discountAmount = (subtotal * percent) / 100;
        break;
      }
      case CouponType.FIXED_AMOUNT: {
        discountAmount = Number(coupon.value);
        break;
      }
      case CouponType.FREE_SHIPPING: {
        isFreeShipping = true;
        discountAmount = shippingFee;
        break;
      }
      case CouponType.BUY_X_GET_Y: {
        const buyX = coupon.buyXQuantity || 1;
        const getY = coupon.getYQuantity || 1;
        // Apply discount for Y items if items array is provided
        if (items && items.length > 0) {
          const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
          const sets = Math.floor(totalQty / (buyX + getY));
          const avgPrice = subtotal / Math.max(totalQty, 1);
          discountAmount = sets * getY * avgPrice;
        } else {
          discountAmount = Number(coupon.value);
        }
        break;
      }
    }

    discountAmount = Math.min(Math.round(discountAmount * 100) / 100, subtotal + (isFreeShipping ? shippingFee : 0));

    return {
      couponId: coupon.id,
      code: coupon.code,
      type: coupon.type,
      discountAmount,
      isFreeShipping,
    };
  }

  async incrementCouponUsage(couponId: string): Promise<void> {
    await this.repo.incrementUsage(couponId);
  }

  async createCoupon(tenantId: string, data: any): Promise<any> {
    const existing = await this.repo.findCouponByCode(tenantId, data.code);
    if (existing) {
      throw new ValidationError(`Coupon code '${data.code}' already exists for this tenant`);
    }
    return this.repo.createCoupon({
      ...data,
      tenantId,
    });
  }

  async getCoupons(tenantId: string): Promise<any[]> {
    return this.repo.findMany({ where: { tenantId } });
  }
}

export const couponService = new CouponService();
