import { BaseRepository } from '../../../database/repository/base.repository';
import { Refund } from '@prisma/client';

export class RefundRepository extends BaseRepository<Refund> {
  protected model = 'refund' as const;

  async createRefund(data: any): Promise<any> {
    return this.client.refund.create({
      data,
      include: { order: true },
    });
  }

  async findRefundById(id: string): Promise<any | null> {
    return this.client.refund.findUnique({
      where: { id },
      include: { order: true },
    });
  }

  async findRefundsByOrderId(orderId: string): Promise<any[]> {
    return this.client.refund.findMany({
      where: { orderId },
      include: { order: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateRefund(id: string, data: any): Promise<any> {
    return this.client.refund.update({
      where: { id },
      data,
      include: { order: true },
    });
  }
}

export const refundRepository = new RefundRepository();
