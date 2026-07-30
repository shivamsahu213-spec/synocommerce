import { InvalidValueObjectError } from '../errors';

/**
 * ISO 4217 Currency Value Object.
 */
export class Currency {
  private readonly _code: string;

  constructor(code: string) {
    const formatted = code ? code.trim().toUpperCase() : '';
    if (!/^[A-Z]{3}$/.test(formatted)) {
      throw new InvalidValueObjectError(`Invalid ISO 4217 currency code: '${code}'`);
    }
    this._code = formatted;
  }

  public get code(): string {
    return this._code;
  }

  public equals(other?: Currency): boolean {
    if (!other) return false;
    return this._code === other._code;
  }
}
