/**
 * Shared Domain Base Entities
 * @module domain/shared-domain/entities
 */

import { IEntity } from '../contracts';
import { Identifier } from '../value-objects/identifier.vo';

export abstract class Entity<TId extends Identifier = Identifier> implements IEntity<TId> {
  protected readonly _id: TId;

  constructor(id: TId) {
    this._id = id;
  }

  public get id(): TId {
    return this._id;
  }

  public equals(other?: IEntity<TId>): boolean {
    if (!other) return false;
    if (this === other) return true;
    return this._id.equals(other.id);
  }
}
