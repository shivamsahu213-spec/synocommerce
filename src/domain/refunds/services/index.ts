/**
 * Refunds Domain Services (Ports)
 *
 * Interface-only domain / application ports. Concrete adapters belong
 * in the infrastructure layer.
 *
 * @module domain/refunds/services
 */

import { OrderIdentifier } from '../../orders/value-objects';
import { PaymentIdentifier } from '../../payments/value-objects';
import { ReturnIdentifier } from '../../returns/value-objects';
import { RefundAggregate } from '../aggregates';
import {
  RefundCalculation,
  RefundIdentifier,
  RefundReason,
} from '../value-objects';

/**
 * Calculates and creates refunds from order / return context.
 */
export interface IRefundEngine {
  calculateRefund(
    orderId: OrderIdentifier,
    returnId?: ReturnIdentifier
  ): Promise<RefundCalculation>;
  createRefund(
    orderId: OrderIdentifier,
    paymentId: PaymentIdentifier,
    calculation: RefundCalculation,
    reason: RefundReason,
    returnId?: ReturnIdentifier
  ): Promise<RefundAggregate>;
}

/** Approves refunds according to policy and amount thresholds. */
export interface IRefundApprovalService {
  approveRefund(refundId: RefundIdentifier): Promise<boolean>;
}
