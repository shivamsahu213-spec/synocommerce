import { SKU, Money, Currency } from '../..';
import { OrderIdentifier, OrderNumber, OrderTotals, OrderPayment, OrderShipment, OrderInvoice } from '../value-objects';
import { OrderStatus, PaymentStatus, FulfillmentStatus } from '../types';

export interface IOrderItem {
  readonly itemId: string;
  readonly sku: SKU;
  readonly title: string;
  readonly quantity: number;
  readonly unitPrice: Money;
  readonly subtotal: Money;
}

export interface IOrder {
  readonly id: OrderIdentifier;
  readonly orderNumber: OrderNumber;
  readonly customerId: string;
  readonly currency: Currency;
  readonly status: OrderStatus;
  readonly paymentStatus: PaymentStatus;
  readonly fulfillmentStatus: FulfillmentStatus;
  readonly items: readonly IOrderItem[];
  readonly totals: OrderTotals;
  readonly payment?: OrderPayment;
  readonly shipment?: OrderShipment;
  readonly invoice?: OrderInvoice;
}
