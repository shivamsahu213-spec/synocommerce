import { InvalidValueObjectError } from '../errors';

/**
 * Non-negative Quantity Value Object.
 */
export class Quantity {
  private readonly _value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value < 0) {
      throw new InvalidValueObjectError(`Quantity must be a non-negative integer: ${value}`);
    }
    this._value = value;
  }

  public get value(): number {
    return this._value;
  }

  public equals(other?: Quantity): boolean {
    if (!other) return false;
    return this._value === other._value;
  }
}
