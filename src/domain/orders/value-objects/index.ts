/**
 * Orders Domain Value Objects
 *
 * Cross-context shipment/invoice/tax identifiers live in their owning Sprint 3
 * bounded contexts. Order projections store identifier-only string references.
 *
 * @module domain/orders/value-objects
 */

import { Identifier, Money, Address } from '../..';

export class OrderIdentifier extends Identifier {}

export class OrderNumber {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Order number cannot be empty');
    }
    this._value = value.trim().toUpperCase();
  }

  public get value(): string {
    return this._value;
  }

  public equals(other?: OrderNumber): boolean {
    return other ? this._value === other._value : false;
  }
}

export interface OrderTotals {
  readonly subtotal: Money;
  readonly shippingTotal: Money;
  readonly taxTotal: Money;
  readonly discountTotal: Money;
  readonly grandTotal: Money;
}

export interface OrderTimelineEntry {
  readonly timestamp: Date;
  readonly status: string;
  readonly note?: string;
}

export interface OrderPayment {
  /** Identifier-only reference to PaymentAggregate. */
  readonly paymentId: string;
  readonly provider: string;
  readonly amount: Money;
  readonly isPaid: boolean;
}

export interface OrderShipment {
  /** Identifier-only reference to ShipmentAggregate. */
  readonly id: string;
  readonly trackingNumber: string;
  readonly carrier: string;
  readonly shippingAddress: Address;
  readonly shippedAt?: Date;
}

export interface OrderInvoice {
  /** Identifier-only reference to InvoiceAggregate. */
  readonly id: string;
  readonly invoiceNumber: string;
  readonly issuedAt: Date;
  readonly amountDue: Money;
}

export interface OrderHistory {
  readonly timeline: readonly OrderTimelineEntry[];
}
