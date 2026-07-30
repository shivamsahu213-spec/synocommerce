/**
 * Refunds Domain Value Objects
 *
 * @module domain/refunds/value-objects
 */

import { Identifier, Money } from '../..';

/** Strongly-typed identity for RefundAggregate. */
export class RefundIdentifier extends Identifier {}

/**
 * Canonical refund lifecycle status owned by the refunds bounded context.
 */
export type RefundStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'PROCESSED'
  | 'FAILED'
  | 'REJECTED';

export type RefundReason =
  | 'RETURN_APPROVED'
  | 'ORDER_CANCELLED'
  | 'PRICE_ADJUSTMENT'
  | 'GOODWILL';

/**
 * Immutable breakdown of refundable monetary components.
 */
export interface RefundCalculation {
  readonly itemRefundTotal: Money;
  readonly taxRefundTotal: Money;
  readonly shippingRefundTotal: Money;
  readonly grandRefundTotal: Money;
}
