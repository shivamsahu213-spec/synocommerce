/**
 * Shared Domain Base Repositories
 * @module domain/shared-domain/repositories
 */

import { IAggregateRoot } from '../contracts';
import { PaginatedResult, PaginationParams } from '../types';
import { Identifier } from '../value-objects/identifier.vo';

export interface IBaseRepository<TAggregate extends IAggregateRoot<TId>, TId extends Identifier = Identifier> {
  findById(id: TId): Promise<TAggregate | null>;
  findAll(params?: PaginationParams): Promise<PaginatedResult<TAggregate>>;
  save(aggregate: TAggregate): Promise<void>;
  delete(id: TId): Promise<void>;
}
