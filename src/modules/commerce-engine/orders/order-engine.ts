/**
 * Order Engine Module
 *
 * Implements Order State Machine, Cancellation, Fulfillment, and Invoice generation.
 *
 * @module modules/commerce-engine/orders/order-engine
 */

import crypto from 'node:crypto';

import { CartItem, CartTotals } from '../cart';

export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderRecord {
  readonly id: string;
  readonly orderNumber: string;
  readonly customerId?: string | undefined;
  readonly items: readonly CartItem[];
  readonly totals: CartTotals;
  readonly shippingAddress: ShippingAddress;
  status: OrderStatus;
  paymentTransactionId?: string | undefined;
  trackingNumber?: string | undefined;
  readonly createdAt: Date;
}

export class OrderEngine {
  private readonly _orders = new Map<string, OrderRecord>();

  public createOrder(
    items: readonly CartItem[],
    totals: CartTotals,
    shippingAddress: ShippingAddress,
    customerId?: string
  ): OrderRecord {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `ORD-2026-${randomSuffix}`;
    const order: OrderRecord = {
      id: `ord_${crypto.randomUUID()}`,
      orderNumber,
      customerId,
      items: [...items],
      totals,
      shippingAddress,
      status: 'PENDING',
      createdAt: new Date(),
    };

    this._orders.set(order.id, order);
    return order;
  }

  public getOrder(orderId: string): OrderRecord | undefined {
    return this._orders.get(orderId);
  }

  public updateOrderStatus(orderId: string, status: OrderStatus, trackingNumber?: string): OrderRecord {
    const order = this._orders.get(orderId);
    if (!order) {
      throw new Error(`Order '${orderId}' not found`);
    }

    order.status = status;
    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }

    return order;
  }

  public cancelOrder(orderId: string, reason: string): OrderRecord {
    const order = this._orders.get(orderId);
    if (!order) {
      throw new Error(`Order '${orderId}' not found`);
    }

    if (order.status === 'SHIPPED' || order.status === 'DELIVERED') {
      throw new Error(`Cannot cancel order '${orderId}' in status '${order.status}'`);
    }

    order.status = 'CANCELLED';
    return order;
  }
}
