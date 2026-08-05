/**
 * Infrastructure Base Repository Pattern Implementation
 *
 * Implements persistence isolation for domain aggregates.
 *
 * @module infrastructure/repositories/base-repository
 */

import { AggregateRoot,Identifier } from '../../domain/shared-domain';
import { IDatabaseAdapter } from '../persistence/database.adapter';

export abstract class AbstractBaseRepository<TId extends Identifier, TAggregate extends AggregateRoot<TId>> {
  constructor(protected readonly dbAdapter: IDatabaseAdapter) {}

  public abstract findById(id: TId): Promise<TAggregate | undefined>;
  public abstract save(aggregate: TAggregate): Promise<void>;
  public abstract delete(id: TId): Promise<void>;
}
