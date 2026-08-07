import { Currency,Money, SKU } from '../..';
import { OrderFulfillmentStatus,OrderPaymentStatus, OrderStatus } from '../types';
import { OrderIdentifier, OrderInvoice,OrderNumber, OrderPayment, OrderShipment, OrderTotals } from '../value-objects';

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
  readonly paymentStatus: OrderPaymentStatus;
  readonly fulfillmentStatus: OrderFulfillmentStatus;
  readonly items: readonly IOrderItem[];
  readonly totals: OrderTotals;
  readonly payment?: OrderPayment | undefined;
  readonly shipment?: OrderShipment | undefined;
  readonly invoice?: OrderInvoice | undefined;
}
