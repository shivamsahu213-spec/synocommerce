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

  public get value(): string { return this._value; }
  public equals(other?: OrderNumber): boolean { return other ? this._value === other._value : false; }
}

export class TrackingNumber {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Tracking number cannot be empty');
    }
    this._value = value.trim();
  }

  public get value(): string { return this._value; }
}

export class TaxIdentifier extends Identifier {}
export class ShipmentIdentifier extends Identifier {}
export class InvoiceIdentifier extends Identifier {}

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
  readonly paymentId: string;
  readonly provider: string;
  readonly amount: Money;
  readonly isPaid: boolean;
}

export interface OrderShipment {
  readonly id: ShipmentIdentifier;
  readonly trackingNumber: TrackingNumber;
  readonly carrier: string;
  readonly shippingAddress: Address;
  readonly shippedAt?: Date;
}

export interface OrderInvoice {
  readonly id: InvoiceIdentifier;
  readonly invoiceNumber: string;
  readonly issuedAt: Date;
  readonly amountDue: Money;
}

export interface OrderHistory {
  readonly timeline: readonly OrderTimelineEntry[];
}
