/**
 * Shared Domain Events Base
 * @module domain/shared-domain/events
 */

import { IDomainEvent } from '../contracts';

export abstract class BaseDomainEvent implements IDomainEvent {
  public readonly eventId: string;
  public readonly occurredOn: Date;
  public abstract readonly eventName: string;

  constructor() {
    this.eventId = crypto.randomUUID();
    this.occurredOn = new Date();
  }
}
