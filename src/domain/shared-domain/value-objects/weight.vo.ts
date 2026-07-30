import { WeightUnit } from '../types';
import { InvalidValueObjectError } from '../errors';

/**
 * Weight Measurement Value Object.
 */
export class Weight {
  private readonly _value: number;
  private readonly _unit: WeightUnit;

  constructor(value: number, unit: WeightUnit) {
    if (!Number.isFinite(value) || value < 0) {
      throw new InvalidValueObjectError(`Weight must be a non-negative number: ${value}`);
    }
    this._value = value;
    this._unit = unit;
  }

  public get value(): number {
    return this._value;
  }

  public get unit(): WeightUnit {
    return this._unit;
  }

  public equals(other?: Weight): boolean {
    if (!other) return false;
    return this._value === other._value && this._unit === other._unit;
  }
}
