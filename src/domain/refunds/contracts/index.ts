/**
 * Refunds Domain Contracts
 *
 * @module domain/refunds/contracts
 */

import { Money, SKU } from '../..';
import { OrderIdentifier } from '../../orders/value-objects';
import { PaymentIdentifier } from '../../payments/value-objects';
import { ReturnIdentifier } from '../../returns/value-objects';
import {
  RefundIdentifier,
  RefundReason,
  RefundStatus,
} from '../value-objects';

/** Line item contributing to a refund. */
export interface IRefundLine {
  readonly lineId: string;
  readonly sku: SKU;
  readonly quantity: number;
  readonly refundAmount: Money;
}

/** Aggregate root contract for the refunds bounded context. */
export interface IRefund {
  readonly id: RefundIdentifier;
  readonly orderId: OrderIdentifier;
  readonly paymentId: PaymentIdentifier;
  readonly returnId?: ReturnIdentifier | undefined;
  readonly amount: Money;
  readonly reason: RefundReason;
  readonly status: RefundStatus;
  readonly lines: readonly IRefundLine[];
}
