import { PHONE_REGEX } from '../constants';
import { InvalidValueObjectError } from '../errors';

/**
 * E.164 Compliant Phone Number Value Object.
 */
export class PhoneNumber {
  private readonly _value: string;

  constructor(value: string) {
    const formatted = value ? value.trim().replace(/[\s()-]/g, '') : '';
    if (!PHONE_REGEX.test(formatted)) {
      throw new InvalidValueObjectError(`Invalid phone number format: '${value}'`);
    }
    this._value = formatted;
  }

  public get value(): string {
    return this._value;
  }

  public equals(other?: PhoneNumber): boolean {
    if (!other) return false;
    return this._value === other._value;
  }
}
