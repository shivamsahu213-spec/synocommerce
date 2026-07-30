/**
 * Payments Domain Events
 *
 * Every event extends ImmutablePaymentDomainEvent which guarantees
 * eventId, occurredOn, aggregateId, version, and frozen metadata.
 *
 * @module domain/payments/events
 */

import { BaseDomainEvent } from '../..';

export abstract class ImmutablePaymentDomainEvent extends BaseDomainEvent {
  public readonly version: number = 1;
  public readonly metadata: Record<string, unknown>;

  constructor(
    public readonly aggregateId: string,
    metadata: Record<string, unknown> = {}
  ) {
    super();
    this.metadata = Object.freeze({ ...metadata });
  }
}

export class PaymentInitiatedEvent extends ImmutablePaymentDomainEvent {
  public readonly eventName = 'payment.initiated';

  constructor(
    aggregateId: string,
    public readonly orderId: string,
    public readonly amount: number,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class PaymentAuthorizedEvent extends ImmutablePaymentDomainEvent {
  public readonly eventName = 'payment.authorized';

  constructor(
    aggregateId: string,
    public readonly authCode: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class PaymentCapturedEvent extends ImmutablePaymentDomainEvent {
  public readonly eventName = 'payment.captured';

  constructor(
    aggregateId: string,
    public readonly captureId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class PaymentFailedEvent extends ImmutablePaymentDomainEvent {
  public readonly eventName = 'payment.failed';

  constructor(
    aggregateId: string,
    public readonly reason: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class PaymentVoidedEvent extends ImmutablePaymentDomainEvent {
  public readonly eventName = 'payment.voided';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}

export class PaymentRefundRequestedEvent extends ImmutablePaymentDomainEvent {
  public readonly eventName = 'payment.refund_requested';

  constructor(
    aggregateId: string,
    public readonly amount: number,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class PaymentRefundCompletedEvent extends ImmutablePaymentDomainEvent {
  public readonly eventName = 'payment.refund_completed';

  constructor(
    aggregateId: string,
    public readonly refundId: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class PaymentDisputedEvent extends ImmutablePaymentDomainEvent {
  public readonly eventName = 'payment.disputed';

  constructor(
    aggregateId: string,
    public readonly disputeReason: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}
