/**
 * Shared Domain Base Aggregates
 * @module domain/shared-domain/aggregates
 */

import { Entity } from '../entities';
import { Identifier } from '../value-objects/identifier.vo';
import { IAggregateRoot, IDomainEvent } from '../contracts';

export abstract class AggregateRoot<TId extends Identifier = Identifier> extends Entity<TId> implements IAggregateRoot<TId> {
  private _domainEvents: IDomainEvent[] = [];

  public get domainEvents(): readonly IDomainEvent[] {
    return [...this._domainEvents];
  }

  protected addDomainEvent(event: IDomainEvent): void {
    this._domainEvents.push(event);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
