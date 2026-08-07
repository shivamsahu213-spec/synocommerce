import { BaseRepository } from '../../../database/repository/base.repository';
import { Order } from '@prisma/client';

export class OrderRepository extends BaseRepository<Order> {
  protected model = 'order' as const;

  async createOrder(data: any): Promise<any> {
    return this.client.order.create({
      data,
      include: {
        items: true,
        payment: true,
        shipment: true,
        refunds: true,
        invoice: true,
      },
    });
  }

  async findOrderById(id: string, includeDeleted = false): Promise<any | null> {
    const where: any = { id };
    if (!includeDeleted) where.isDeleted = false;
    return this.client.order.findFirst({
      where,
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        store: true,
        tenant: true,
        customer: true,
        payment: true,
        shipment: true,
        refunds: true,
        invoice: true,
        coupon: true,
      },
    });
  }

  async findOrderByNumber(orderNumber: string): Promise<any | null> {
    return this.client.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
        store: true,
        tenant: true,
        customer: true,
        payment: true,
        shipment: true,
        refunds: true,
        invoice: true,
        coupon: true,
      },
    });
  }

  async updateOrder(id: string, data: any): Promise<any> {
    return this.client.order.update({
      where: { id },
      data,
      include: {
        items: true,
        payment: true,
        shipment: true,
        refunds: true,
        invoice: true,
      },
    });
  }

  async softDeleteOrder(id: string): Promise<any> {
    return this.client.order.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  async findOrders(params: {
    tenantId: string;
    storeId?: string;
    customerId?: string;
    status?: any;
    paymentStatus?: any;
    shipmentStatus?: any;
    q?: string;
    customerEmail?: string;
    startDate?: Date;
    endDate?: Date;
    minTotal?: number;
    maxTotal?: number;
    skip?: number;
    take?: number;
    orderBy?: any;
  }): Promise<{ orders: any[]; total: number }> {
    const where: any = {
      tenantId: params.tenantId,
      isDeleted: false,
    };

    if (params.storeId) where.storeId = params.storeId;
    if (params.customerId) where.customerId = params.customerId;
    if (params.status) where.status = params.status;
    if (params.paymentStatus) where.paymentStatus = params.paymentStatus;
    if (params.shipmentStatus) where.shipmentStatus = params.shipmentStatus;
    if (params.customerEmail) where.customerEmail = { contains: params.customerEmail, mode: 'insensitive' };

    if (params.q) {
      where.OR = [
        { orderNumber: { contains: params.q, mode: 'insensitive' } },
        { customerEmail: { contains: params.q, mode: 'insensitive' } },
        { customerPhone: { contains: params.q, mode: 'insensitive' } },
      ];
    }

    if (params.startDate || params.endDate) {
      where.createdAt = {};
      if (params.startDate) where.createdAt.gte = params.startDate;
      if (params.endDate) where.createdAt.lte = params.endDate;
    }

    if (params.minTotal !== undefined || params.maxTotal !== undefined) {
      where.totalAmount = {};
      if (params.minTotal !== undefined) where.totalAmount.gte = params.minTotal;
      if (params.maxTotal !== undefined) where.totalAmount.lte = params.maxTotal;
    }

    const queryOptions: any = {
      where,
      orderBy: params.orderBy || { createdAt: 'desc' },
      include: {
        items: true,
        payment: true,
        shipment: true,
        refunds: true,
        invoice: true,
      },
    };
    if (params.skip !== undefined) queryOptions.skip = params.skip;
    if (params.take !== undefined) queryOptions.take = params.take;

    const [orders, total] = await Promise.all([
      this.client.order.findMany(queryOptions),
      this.client.order.count({ where }),
    ]);

    return { orders, total };
  }
}

export const orderRepository = new OrderRepository();
