/**
 * Orders Domain Types
 *
 * Order-local projection statuses are prefixed to avoid colliding with
 * the canonical PaymentStatus / FulfillmentStatus owned by Sprint 3 contexts.
 *
 * @module domain/orders/types
 */

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

/** Order-level payment projection — distinct from payments.PaymentStatus. */
export type OrderPaymentStatus = 'UNPAID' | 'AUTHORIZED' | 'PAID' | 'REFUNDED';

/** Order-level fulfillment projection — distinct from fulfillment.FulfillmentStatus. */
export type OrderFulfillmentStatus =
  | 'UNFULFILLED'
  | 'PARTIALLY_FULFILLED'
  | 'FULFILLED'
  | 'RETURNED';
