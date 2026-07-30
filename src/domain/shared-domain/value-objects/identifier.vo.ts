import { InvalidValueObjectError } from '../errors';

/**
 * Strongly typed immutable Identifier Value Object.
 */
export class Identifier {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new InvalidValueObjectError('Identifier value cannot be empty');
    }
    this._value = value.trim();
  }

  public get value(): string {
    return this._value;
  }

  public equals(other?: Identifier): boolean {
    if (!other) return false;
    return this._value === other._value;
  }

  public toString(): string {
    return this._value;
  }
}
