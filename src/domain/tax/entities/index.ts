/**
 * Tax Domain Entities
 *
 * Child entities belonging to the tax bounded context. Kept persistence-independent.
 * TaxRate is modeled as TaxRateAggregate; rules and categories are entities.
 *
 * @module domain/tax/entities
 */

import { Entity, Identifier, Percentage } from '../..';
import { ITaxCategory, ITaxRule } from '../contracts';
import { TaxType } from '../types';

export class TaxCategoryEntity extends Entity<Identifier> implements ITaxCategory {
  constructor(
    id: Identifier,
    public readonly code: string,
    public readonly name: string,
    public readonly isExempt: boolean = false
  ) {
    super(id);
  }

  public get categoryId(): string {
    return this._id.value;
  }
}

export class TaxRuleEntity extends Entity<Identifier> implements ITaxRule {
  private _isActive: boolean;

  constructor(
    id: Identifier,
    public readonly taxCategoryId: string,
    public readonly jurisdictionId: string,
    public readonly rate: Percentage,
    public readonly taxType: TaxType,
    isActive: boolean = true
  ) {
    super(id);
    this._isActive = isActive;
  }

  public get ruleId(): string {
    return this._id.value;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public deactivate(): void {
    this._isActive = false;
  }

  public activate(): void {
    this._isActive = true;
  }
}
