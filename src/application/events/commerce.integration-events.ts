/**
 * Application Integration Events
 * @module application/events/commerce.integration-events
 */

import { IIntegrationEvent } from './integration-event.interface';

export abstract class BaseIntegrationEvent implements IIntegrationEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public abstract readonly eventName: string;

  constructor(public readonly correlationId?: string | undefined, public readonly tenantId?: string | undefined) {
    this.eventId = crypto.randomUUID();
    this.occurredOn = new Date();
  }
}

export class OrderPlacedIntegrationEvent extends BaseIntegrationEvent {
  public readonly eventName = 'OrderPlacedIntegrationEvent';
  constructor(
    public readonly orderId: string,
    public readonly customerId: string,
    public readonly grandTotal: number,
    public readonly currency: string,
    correlationId?: string,
    tenantId?: string
  ) {
    super(correlationId, tenantId);
  }
}

export class PaymentCapturedIntegrationEvent extends BaseIntegrationEvent {
  public readonly eventName = 'PaymentCapturedIntegrationEvent';
  constructor(
    public readonly paymentId: string,
    public readonly orderId: string,
    public readonly amount: number,
    public readonly currency: string,
    correlationId?: string,
    tenantId?: string
  ) {
    super(correlationId, tenantId);
  }
}

export class ShipmentDeliveredIntegrationEvent extends BaseIntegrationEvent {
  public readonly eventName = 'ShipmentDeliveredIntegrationEvent';
  constructor(
    public readonly shipmentId: string,
    public readonly orderId: string,
    public readonly trackingNumber: string,
    correlationId?: string,
    tenantId?: string
  ) {
    super(correlationId, tenantId);
  }
}

export class CustomerRegisteredIntegrationEvent extends BaseIntegrationEvent {
  public readonly eventName = 'CustomerRegisteredIntegrationEvent';
  constructor(
    public readonly customerId: string,
    public readonly email: string,
    correlationId?: string,
    tenantId?: string
  ) {
    super(correlationId, tenantId);
  }
}
