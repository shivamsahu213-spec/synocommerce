import { InvalidValueObjectError } from '../errors';

/**
 * 0–100 Percentage Value Object.
 */
export class Percentage {
  private readonly _value: number;

  constructor(value: number) {
    if (!Number.isFinite(value) || value < 0 || value > 100) {
      throw new InvalidValueObjectError(`Percentage must be between 0 and 100: ${value}`);
    }
    this._value = Math.round(value * 100) / 100;
  }

  public get value(): number {
    return this._value;
  }

  public get factor(): number {
    return this._value / 100;
  }

  public equals(other?: Percentage): boolean {
    if (!other) return false;
    return this._value === other._value;
  }
}
