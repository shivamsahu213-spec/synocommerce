/**
 * Commerce Engine Domain Events
 * @module modules/commerce-engine/events/events
 */

import crypto from 'node:crypto';

export interface ICommerceEngineEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly timestamp: Date;
}

export class CartCreatedEngineEvent implements ICommerceEngineEvent {
  public readonly eventId: string = crypto.randomUUID();
  public readonly eventName = 'CartCreated';
  public readonly timestamp: Date = new Date();
  constructor(public readonly cartId: string, public readonly customerId?: string | undefined) {}
}

export class CartUpdatedEngineEvent implements ICommerceEngineEvent {
  public readonly eventId: string = crypto.randomUUID();
  public readonly eventName = 'CartUpdated';
  public readonly timestamp: Date = new Date();
  constructor(public readonly cartId: string, public readonly itemCount: number, public readonly total: number) {}
}

export class CheckoutStartedEngineEvent implements ICommerceEngineEvent {
  public readonly eventId: string = crypto.randomUUID();
  public readonly eventName = 'CheckoutStarted';
  public readonly timestamp: Date = new Date();
  constructor(public readonly checkoutSessionId: string, public readonly cartId: string) {}
}

export class OrderPlacedEngineEvent implements ICommerceEngineEvent {
  public readonly eventId: string = crypto.randomUUID();
  public readonly eventName = 'OrderPlaced';
  public readonly timestamp: Date = new Date();
  constructor(public readonly orderId: string, public readonly orderNumber: string, public readonly totalAmount: number) {}
}

export class OrderCancelledEngineEvent implements ICommerceEngineEvent {
  public readonly eventId: string = crypto.randomUUID();
  public readonly eventName = 'OrderCancelled';
  public readonly timestamp: Date = new Date();
  constructor(public readonly orderId: string, public readonly reason: string) {}
}

export class InventoryReservedEngineEvent implements ICommerceEngineEvent {
  public readonly eventId: string = crypto.randomUUID();
  public readonly eventName = 'InventoryReserved';
  public readonly timestamp: Date = new Date();
  constructor(public readonly sku: string, public readonly quantity: number, public readonly reservationId: string) {}
}

export class ShipmentCreatedEngineEvent implements ICommerceEngineEvent {
  public readonly eventId: string = crypto.randomUUID();
  public readonly eventName = 'ShipmentCreated';
  public readonly timestamp: Date = new Date();
  constructor(public readonly shipmentId: string, public readonly trackingNumber: string) {}
}

export class PaymentCapturedEngineEvent implements ICommerceEngineEvent {
  public readonly eventId: string = crypto.randomUUID();
  public readonly eventName = 'PaymentCaptured';
  public readonly timestamp: Date = new Date();
  constructor(public readonly paymentId: string, public readonly amount: number) {}
}

export class RefundIssuedEngineEvent implements ICommerceEngineEvent {
  public readonly eventId: string = crypto.randomUUID();
  public readonly eventName = 'RefundIssued';
  public readonly timestamp: Date = new Date();
  constructor(public readonly refundId: string, public readonly amount: number) {}
}

export class PromotionAppliedEngineEvent implements ICommerceEngineEvent {
  public readonly eventId: string = crypto.randomUUID();
  public readonly eventName = 'PromotionApplied';
  public readonly timestamp: Date = new Date();
  constructor(public readonly promotionCode: string, public readonly discountAmount: number) {}
}
