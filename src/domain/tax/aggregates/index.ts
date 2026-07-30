/**
 * Tax Domain Aggregate
 *
 * TaxRateAggregate is the consistency boundary for tax rate configuration.
 * Thin config aggregate — calculation orchestration lives in ITaxEngine.
 *
 * @module domain/tax/aggregates
 */

import { AggregateRoot, Percentage } from '../..';
import { ITaxRate } from '../contracts';
import { TaxIdentifier } from '../value-objects';
import { TaxType } from '../types';
import { TaxRateInactiveError } from '../errors';
import {
  TaxRateActivatedEvent,
  TaxRateDeactivatedEvent,
} from '../events';

export class TaxRateAggregate extends AggregateRoot<TaxIdentifier> implements ITaxRate {
  private _isActive: boolean;
  private _name: string;
  private _rate: Percentage;

  constructor(
    id: TaxIdentifier,
    name: string,
    rate: Percentage,
    public readonly taxType: TaxType = 'SALES_TAX',
    isActive: boolean = true
  ) {
    super(id);
    this._name = name;
    this._rate = rate;
    this._isActive = isActive;
  }

  public get name(): string {
    return this._name;
  }

  public get rate(): Percentage {
    return this._rate;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public updateRate(rate: Percentage): void {
    if (!this._isActive) {
      throw new TaxRateInactiveError(this.id.value);
    }
    this._rate = rate;
  }

  public rename(name: string): void {
    if (!this._isActive) {
      throw new TaxRateInactiveError(this.id.value);
    }
    this._name = name;
  }

  public activate(): void {
    if (this._isActive) {
      return;
    }
    this._isActive = true;
    this.addDomainEvent(new TaxRateActivatedEvent(this.id.value));
  }

  public deactivate(): void {
    if (!this._isActive) {
      return;
    }
    this._isActive = false;
    this.addDomainEvent(new TaxRateDeactivatedEvent(this.id.value));
  }
}
