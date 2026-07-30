/**
 * Shared Domain Base Contracts
 * @module domain/shared-domain/contracts
 */

import { Identifier } from '../value-objects/identifier.vo';

export interface IDomainEvent {
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;
}

export interface IEntity<TId extends Identifier = Identifier> {
  readonly id: TId;
  equals(other?: IEntity<TId>): boolean;
}

export interface IAggregateRoot<TId extends Identifier = Identifier> extends IEntity<TId> {
  readonly domainEvents: readonly IDomainEvent[];
  clearEvents(): void;
}

export interface ISpecification<TCandidate> {
  isSatisfiedBy(candidate: TCandidate): boolean;
}
