/**
 * Tax Domain Events
 *
 * Every event extends ImmutableTaxDomainEvent which guarantees
 * eventId, occurredOn, aggregateId, version, and frozen metadata.
 *
 * @module domain/tax/events
 */

import { BaseDomainEvent } from '../..';

export abstract class ImmutableTaxDomainEvent extends BaseDomainEvent {
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

export class TaxCalculatedEvent extends ImmutableTaxDomainEvent {
  public readonly eventName = 'tax.calculated';

  constructor(
    aggregateId: string,
    public readonly totalTaxAmount: number,
    public readonly jurisdictionId?: string,
    metadata?: Record<string, unknown>
  ) {
    super(aggregateId, metadata);
  }
}

export class TaxRateActivatedEvent extends ImmutableTaxDomainEvent {
  public readonly eventName = 'tax.rate_activated';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}

export class TaxRateDeactivatedEvent extends ImmutableTaxDomainEvent {
  public readonly eventName = 'tax.rate_deactivated';

  constructor(aggregateId: string, metadata?: Record<string, unknown>) {
    super(aggregateId, metadata);
  }
}
