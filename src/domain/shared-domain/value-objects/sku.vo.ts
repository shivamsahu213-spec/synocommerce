import { InvalidValueObjectError } from '../errors';

/**
 * Stock Keeping Unit (SKU) Value Object.
 */
export class SKU {
  private readonly _value: string;

  constructor(value: string) {
    const formatted = value ? value.trim().toUpperCase() : '';
    if (!formatted || formatted.length < 3 || formatted.length > 50) {
      throw new InvalidValueObjectError(`Invalid SKU length: '${value}'`);
    }
    this._value = formatted;
  }

  public get value(): string {
    return this._value;
  }

  public equals(other?: SKU): boolean {
    if (!other) return false;
    return this._value === other._value;
  }
}
