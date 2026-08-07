import { BaseRepository } from '../../../database/repository/base.repository';
import { Coupon } from '@prisma/client';

export class CouponRepository extends BaseRepository<Coupon> {
  protected model = 'coupon' as const;

  async createCoupon(data: any): Promise<any> {
    return this.client.coupon.create({ data });
  }

  async findCouponByCode(tenantId: string, code: string): Promise<any | null> {
    return this.client.coupon.findUnique({
      where: {
        tenantId_code: {
          tenantId,
          code: code.toUpperCase().trim(),
        },
      },
    });
  }

  async incrementUsage(id: string): Promise<any> {
    return this.client.coupon.update({
      where: { id },
      data: {
        usageCount: { increment: 1 },
      },
    });
  }

  async updateCoupon(id: string, data: any): Promise<any> {
    return this.client.coupon.update({
      where: { id },
      data,
    });
  }
}

export const couponRepository = new CouponRepository();
