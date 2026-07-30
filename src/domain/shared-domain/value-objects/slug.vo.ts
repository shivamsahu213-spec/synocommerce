import { InvalidValueObjectError } from '../errors';

/**
 * URL-safe Slug Value Object.
 */
export class Slug {
  private readonly _value: string;

  constructor(value: string) {
    const formatted = value ? value.trim().toLowerCase() : '';
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formatted)) {
      throw new InvalidValueObjectError(`Invalid slug format: '${value}'`);
    }
    this._value = formatted;
  }

  public get value(): string {
    return this._value;
  }

  public equals(other?: Slug): boolean {
    if (!other) return false;
    return this._value === other._value;
  }
}
