/**
 * Checkout Engine Module
 *
 * Multi-step checkout orchestration connecting Cart, Inventory, Payment, and Order engines.
 *
 * @module modules/commerce-engine/checkout/checkout-engine
 */

import crypto from 'node:crypto';
import { CartAggregate, CartEngine } from '../cart';
import { InventoryEngine } from '../inventory';
import { PaymentEngine } from '../payments';
import { OrderEngine, OrderRecord, ShippingAddress } from '../orders';

export type CheckoutStep = 'SHIPPING' | 'BILLING' | 'PAYMENT' | 'REVIEW' | 'CONFIRMED';

export interface CheckoutSession {
  readonly id: string;
  readonly cartId: string;
  readonly customerId?: string | undefined;
  step: CheckoutStep;
  shippingAddress?: ShippingAddress | undefined;
  paymentMethod?: string | undefined;
  orderId?: string | undefined;
}

export class CheckoutEngine {
  private readonly _sessions = new Map<string, CheckoutSession>();

  constructor(
    private readonly _cartEngine: CartEngine,
    private readonly _inventoryEngine: InventoryEngine,
    private readonly _paymentEngine: PaymentEngine,
    private readonly _orderEngine: OrderEngine
  ) {}

  public startCheckout(cart: CartAggregate, customerId?: string): CheckoutSession {
    if (cart.items.length === 0) {
      throw new Error('Cannot start checkout with an empty cart');
    }

    const session: CheckoutSession = {
      id: `chk_${crypto.randomUUID()}`,
      cartId: cart.id,
      customerId,
      step: 'SHIPPING',
    };

    this._sessions.set(session.id, session);
    return session;
  }

  public setShippingAddress(sessionId: string, address: ShippingAddress): CheckoutSession {
    const session = this._sessions.get(sessionId);
    if (!session) {
      throw new Error(`Checkout session '${sessionId}' not found`);
    }

    session.shippingAddress = address;
    session.step = 'PAYMENT';
    return session;
  }

  public async completeCheckout(sessionId: string, cart: CartAggregate, paymentProvider = 'Stripe'): Promise<OrderRecord> {
    const session = this._sessions.get(sessionId);
    if (!session) {
      throw new Error(`Checkout session '${sessionId}' not found`);
    }

    if (!session.shippingAddress) {
      throw new Error('Shipping address is required to complete checkout');
    }

    // 1. Validate and reserve inventory for all cart items
    const reservations: string[] = [];
    try {
      for (const item of cart.items) {
        const res = this._inventoryEngine.reserveStock(item.sku, item.quantity);
        reservations.push(res.reservationId);
      }
    } catch (err: any) {
      // Rollback reservations if any fail
      reservations.forEach((rId) => this._inventoryEngine.releaseReservation(rId));
      throw new Error(`Inventory allocation failed: ${err.message}`);
    }

    // 2. Calculate final totals
    const totals = this._cartEngine.calculateTotals(cart);

    // 3. Process Payment Authorization & Capture
    const txn = await this._paymentEngine.authorizePayment(totals.grandTotal, paymentProvider);
    const capTxn = await this._paymentEngine.capturePayment(txn.transactionId, totals.grandTotal, paymentProvider);

    // 4. Create Order
    const order = this._orderEngine.createOrder(cart.items, totals, session.shippingAddress, session.customerId);
    order.paymentTransactionId = capTxn.transactionId;
    order.status = 'PAID';

    session.step = 'CONFIRMED';
    session.orderId = order.id;

    return order;
  }
}
