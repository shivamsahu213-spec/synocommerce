import { orderRepository, OrderRepository } from '../repositories/order.repository';
import { pricingService, PricingService, LineItemPricingInput } from './pricing.service';
import { couponService, CouponService } from './coupon.service';
import { invoiceService, InvoiceService } from './invoice.service';
import { domainEventPublisher } from './event.service';
import { cacheOrder, getCachedOrder, invalidateOrderCache } from '../utils/orderCache';
import { NotFoundError, ValidationError } from '../../../common/errors';
import { authRepository } from '../../auth/repositories/auth.repository';
import { OrderStatus, PaymentStatus, Currency } from '@prisma/client';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderSearchDto } from '../dto/order-search.dto';

const ALLOWED_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.DRAFT]: [OrderStatus.PENDING, OrderStatus.CANCELLED],
  [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
  [OrderStatus.CONFIRMED]: [OrderStatus.PACKED, OrderStatus.CANCELLED],
  [OrderStatus.PACKED]: [OrderStatus.READY_FOR_SHIPMENT, OrderStatus.CANCELLED],
  [OrderStatus.READY_FOR_SHIPMENT]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
  [OrderStatus.SHIPPED]: [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED, OrderStatus.CANCELLED],
  [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
  [OrderStatus.DELIVERED]: [OrderStatus.COMPLETED, OrderStatus.REFUND_REQUESTED],
  [OrderStatus.COMPLETED]: [OrderStatus.REFUND_REQUESTED],
  [OrderStatus.REFUND_REQUESTED]: [OrderStatus.REFUNDED],
  [OrderStatus.CANCELLED]: [],
  [OrderStatus.REFUNDED]: [],
};

export class OrderService {
  constructor(
    private repo: OrderRepository = orderRepository,
    private pricingEng: PricingService = pricingService,
    private couponEng: CouponService = couponService,
    private invoiceEng: InvoiceService = invoiceService,
  ) {}

  private validateStatusTransition(currentStatus: OrderStatus, targetStatus: OrderStatus): void {
    if (currentStatus === targetStatus) return;
    const allowed = ALLOWED_STATUS_TRANSITIONS[currentStatus] || [];
    if (!allowed.includes(targetStatus)) {
      throw new ValidationError(
        `Invalid status transition from '${currentStatus}' to '${targetStatus}'. Allowed next states: ${allowed.join(', ') || 'none'}`,
      );
    }
  }

  async createOrder(tenantId: string, storeId: string, dto: CreateOrderDto, actorId?: string) {
    const itemsWithTitle: LineItemPricingInput[] = dto.items.map((i) => ({
      productId: i.productId,
      variantId: i.variantId,
      title: i.productId, // Fallback title
      quantity: i.quantity,
      unitPrice: 0, // Computed by pricing calculation or variant price
    }));

    const pricingParams: any = {
      tenantId,
      storeId,
      items: itemsWithTitle,
      shippingAddress: {
        country: dto.shippingAddress.country,
        ...(dto.shippingAddress.region ? { region: dto.shippingAddress.region } : {}),
      },
    };
    if (dto.couponCode) pricingParams.couponCode = dto.couponCode;
    if (dto.customerId) pricingParams.customerId = dto.customerId;

    const pricing = await this.pricingEng.calculatePricing(pricingParams);

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randStr = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNumber = `ORD-${dateStr}-${randStr}`;

    const orderData: any = {
      orderNumber,
      tenantId,
      storeId: dto.storeId || storeId,
      customerId: dto.customerId || null,
      customerEmail: dto.customerEmail || null,
      customerPhone: dto.customerPhone || null,
      status: OrderStatus.PENDING,
      currency: dto.currency || 'USD',
      subtotal: pricing.subtotal,
      discountAmount: pricing.discountAmount,
      shippingAmount: pricing.shippingAmount,
      taxAmount: pricing.taxAmount,
      totalAmount: pricing.totalAmount,
      couponCode: pricing.couponCode || null,
      couponId: pricing.couponId || null,
      shippingAddress: dto.shippingAddress,
      billingAddress: dto.billingAddress || dto.shippingAddress,
      items: {
        create: pricing.lineItems.map((li) => ({
          productId: li.productId,
          variantId: li.variantId || null,
          title: li.title,
          sku: li.sku || null,
          quantity: li.quantity,
          unitPrice: li.unitPrice,
          discountAmount: li.discountAmount,
          taxAmount: li.taxAmount,
          totalPrice: li.totalPrice,
          productMetadata: li.productMetadata || null,
        })),
      },
    };

    const order = await this.repo.createOrder(orderData);

    if (pricing.couponId) {
      await this.couponEng.incrementCouponUsage(pricing.couponId);
    }

    await this.invoiceEng.generateInvoice(order.id, tenantId);

    await authRepository.createAuditLog({
      tenantId,
      actorId: actorId || null,
      action: 'ORDER_CREATE',
      targetId: order.id,
      metadata: { orderNumber: order.orderNumber, totalAmount: order.totalAmount },
    });

    await domainEventPublisher.publish('OrderCreated', tenantId, order.id, {
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
    });

    return order;
  }

  async getOrderById(id: string, tenantId: string): Promise<any> {
    const cached = await getCachedOrder(id);
    if (cached && cached.tenantId === tenantId) {
      return cached;
    }

    const order = await this.repo.findOrderById(id);
    if (!order || order.tenantId !== tenantId) {
      throw new NotFoundError(`Order '${id}' not found`);
    }

    await cacheOrder(id, order);
    return order;
  }

  async updateOrder(id: string, tenantId: string, dto: UpdateOrderDto, actorId?: string): Promise<any> {
    const existing = await this.repo.findOrderById(id);
    if (!existing || existing.tenantId !== tenantId) {
      throw new NotFoundError(`Order '${id}' not found`);
    }

    if (dto.status) {
      this.validateStatusTransition(existing.status, dto.status);
    }

    const updateData: any = {};
    if (dto.status) updateData.status = dto.status;
    if (dto.paymentStatus) updateData.paymentStatus = dto.paymentStatus;
    if (dto.shipmentStatus) updateData.shipmentStatus = dto.shipmentStatus;
    if (dto.shippingAddress) updateData.shippingAddress = dto.shippingAddress;
    if (dto.billingAddress) updateData.billingAddress = dto.billingAddress;
    if (dto.cancelReason) updateData.cancelReason = dto.cancelReason;

    if (dto.status === OrderStatus.CANCELLED) {
      updateData.cancelledAt = new Date();
    } else if (dto.status === OrderStatus.CONFIRMED && !existing.approvedAt) {
      updateData.approvedAt = new Date();
    } else if (dto.status === OrderStatus.SHIPPED && !existing.shippedAt) {
      updateData.shippedAt = new Date();
    } else if (dto.status === OrderStatus.DELIVERED && !existing.deliveredAt) {
      updateData.deliveredAt = new Date();
    }

    const updated = await this.repo.updateOrder(id, updateData);

    await invalidateOrderCache(id, tenantId);

    await authRepository.createAuditLog({
      tenantId,
      actorId: actorId || null,
      action: 'ORDER_UPDATE',
      targetId: id,
      metadata: updateData,
    });

    if (dto.status === OrderStatus.CONFIRMED) {
      await domainEventPublisher.publish('OrderConfirmed', tenantId, id, { orderNumber: updated.orderNumber });
    } else if (dto.status === OrderStatus.CANCELLED) {
      await domainEventPublisher.publish('OrderCancelled', tenantId, id, { cancelReason: dto.cancelReason });
    }

    return updated;
  }

  async softDeleteOrder(id: string, tenantId: string, actorId?: string): Promise<void> {
    const existing = await this.repo.findOrderById(id);
    if (!existing || existing.tenantId !== tenantId) {
      throw new NotFoundError(`Order '${id}' not found`);
    }

    await this.repo.softDeleteOrder(id);
    await invalidateOrderCache(id, tenantId);

    await authRepository.createAuditLog({
      tenantId,
      actorId: actorId || null,
      action: 'ORDER_DELETE',
      targetId: id,
      metadata: { isDeleted: true },
    });
  }

  async searchOrders(tenantId: string, dto: OrderSearchDto) {
    const page = dto.page || 1;
    const limit = dto.limit || 20;
    const skip = (page - 1) * limit;
    const take = limit;

    const startDate = dto.startDate ? new Date(dto.startDate) : undefined;
    const endDate = dto.endDate ? new Date(dto.endDate) : undefined;
    const sortBy = dto.sortBy || 'createdAt';
    const sortOrder = dto.sortOrder || 'desc';

    const orderBy = { [sortBy]: sortOrder };

    const searchParams: any = {
      tenantId,
      skip,
      take,
      orderBy,
    };

    if (dto.status) searchParams.status = dto.status;
    if (dto.paymentStatus) searchParams.paymentStatus = dto.paymentStatus;
    if (dto.shipmentStatus) searchParams.shipmentStatus = dto.shipmentStatus;
    if (dto.q) searchParams.q = dto.q;
    if (dto.customerEmail) searchParams.customerEmail = dto.customerEmail;
    if (startDate) searchParams.startDate = startDate;
    if (endDate) searchParams.endDate = endDate;
    if (dto.minTotal !== undefined) searchParams.minTotal = dto.minTotal;
    if (dto.maxTotal !== undefined) searchParams.maxTotal = dto.maxTotal;

    const { orders, total } = await this.repo.findOrders(searchParams);

    const totalPages = Math.ceil(total / take);

    return {
      items: orders,
      meta: {
        page,
        limit,
        totalItems: total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  // Customer APIs
  async getMyOrders(tenantId: string, customerId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const { orders, total } = await this.repo.findOrders({
      tenantId,
      customerId,
      skip,
      take: limit,
    });
    return {
      items: orders,
      meta: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getMyOrderById(id: string, tenantId: string, customerId: string) {
    const order = await this.repo.findOrderById(id);
    if (!order || order.tenantId !== tenantId || order.customerId !== customerId) {
      throw new NotFoundError(`Order '${id}' not found`);
    }
    return order;
  }

  async cancelMyOrder(id: string, tenantId: string, customerId: string, reason?: string) {
    const order = await this.repo.findOrderById(id);
    if (!order || order.tenantId !== tenantId || order.customerId !== customerId) {
      throw new NotFoundError(`Order '${id}' not found`);
    }

    this.validateStatusTransition(order.status, OrderStatus.CANCELLED);

    return this.updateOrder(id, tenantId, {
      status: OrderStatus.CANCELLED,
      cancelReason: reason || 'Cancelled by customer',
    }, customerId);
  }

  async returnMyOrder(id: string, tenantId: string, customerId: string, reason: string) {
    const order = await this.repo.findOrderById(id);
    if (!order || order.tenantId !== tenantId || order.customerId !== customerId) {
      throw new NotFoundError(`Order '${id}' not found`);
    }

    this.validateStatusTransition(order.status, OrderStatus.REFUND_REQUESTED);

    return this.updateOrder(id, tenantId, {
      status: OrderStatus.REFUND_REQUESTED,
      cancelReason: reason,
    }, customerId);
  }

  // Admin APIs
  async approveOrder(id: string, tenantId: string, actorId: string) {
    return this.updateOrder(id, tenantId, { status: OrderStatus.CONFIRMED }, actorId);
  }

  async shipOrder(id: string, tenantId: string, actorId: string) {
    return this.updateOrder(id, tenantId, { status: OrderStatus.SHIPPED }, actorId);
  }

  async deliverOrder(id: string, tenantId: string, actorId: string) {
    return this.updateOrder(id, tenantId, { status: OrderStatus.DELIVERED }, actorId);
  }

  async refundOrder(id: string, tenantId: string, actorId: string) {
    return this.updateOrder(id, tenantId, {
      status: OrderStatus.REFUNDED,
      paymentStatus: PaymentStatus.REFUNDED,
    }, actorId);
  }
}

export const orderService = new OrderService();
