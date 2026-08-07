import { refundRepository, RefundRepository } from '../repositories/refund.repository';
import { orderRepository, OrderRepository } from '../repositories/order.repository';
import { domainEventPublisher } from './event.service';
import { invalidateOrderCache } from '../utils/orderCache';
import { NotFoundError, ValidationError } from '../../../common/errors';
import { RefundRequestDto, RefundApproveDto } from '../dto/refund.dto';
import { RefundType, RefundApprovalStatus, RefundStatus, OrderStatus, PaymentStatus } from '@prisma/client';

export class RefundService {
  constructor(
    private repo: RefundRepository = refundRepository,
    private orderRepo: OrderRepository = orderRepository,
  ) {}

  async requestRefund(tenantId: string, dto: RefundRequestDto) {
    const order = await this.orderRepo.findOrderById(dto.orderId);
    if (!order) {
      throw new NotFoundError(`Order '${dto.orderId}' not found`);
    }

    if (order.tenantId !== tenantId) {
      throw new ValidationError('Tenant isolation mismatch');
    }

    const refundAmount = dto.type === RefundType.FULL || !dto.amount ? Number(order.totalAmount) : dto.amount;

    if (refundAmount > Number(order.totalAmount)) {
      throw new ValidationError(`Refund amount ($${refundAmount}) cannot exceed order total ($${order.totalAmount})`);
    }

    const refund = await this.repo.createRefund({
      orderId: order.id,
      tenantId,
      amount: refundAmount,
      currency: order.currency,
      reason: dto.reason,
      type: dto.type || RefundType.FULL,
      approvalStatus: RefundApprovalStatus.PENDING,
      status: RefundStatus.PENDING,
    });

    await this.orderRepo.updateOrder(order.id, {
      status: OrderStatus.REFUND_REQUESTED,
    });

    await domainEventPublisher.publish('RefundCreated', tenantId, order.id, {
      refundId: refund.id,
      amount: refundAmount,
      reason: dto.reason,
    });

    await invalidateOrderCache(order.id, tenantId);

    return refund;
  }

  async processRefundApproval(tenantId: string, dto: RefundApproveDto) {
    const refund = await this.repo.findRefundById(dto.refundId);
    if (!refund || refund.tenantId !== tenantId) {
      throw new NotFoundError(`Refund '${dto.refundId}' not found`);
    }

    const approvalStatus = dto.approvalStatus;
    const status = approvalStatus === RefundApprovalStatus.APPROVED ? RefundStatus.COMPLETED : RefundStatus.FAILED;

    const updatedRefund = await this.repo.updateRefund(refund.id, {
      approvalStatus,
      status,
      approvedBy: dto.approvedBy || null,
      processedAt: new Date(),
    });

    if (approvalStatus === RefundApprovalStatus.APPROVED) {
      await this.orderRepo.updateOrder(refund.orderId, {
        status: OrderStatus.REFUNDED,
        paymentStatus: PaymentStatus.REFUNDED,
      });
    }

    await invalidateOrderCache(refund.orderId, tenantId);

    return updatedRefund;
  }

  async getRefundsForOrder(orderId: string, tenantId: string) {
    const order = await this.orderRepo.findOrderById(orderId);
    if (!order || order.tenantId !== tenantId) {
      throw new NotFoundError(`Order '${orderId}' not found`);
    }
    return this.repo.findRefundsByOrderId(orderId);
  }
}

export const refundService = new RefundService();
