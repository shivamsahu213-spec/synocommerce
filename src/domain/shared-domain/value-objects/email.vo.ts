import { EMAIL_REGEX } from '../constants';
import { InvalidValueObjectError } from '../errors';

/**
 * Validated RFC Email Address Value Object.
 */
export class Email {
  private readonly _value: string;

  constructor(value: string) {
    const formatted = value ? value.trim().toLowerCase() : '';
    if (!EMAIL_REGEX.test(formatted)) {
      throw new InvalidValueObjectError(`Invalid email address: '${value}'`);
    }
    this._value = formatted;
  }

  public get value(): string {
    return this._value;
  }

  public equals(other?: Email): boolean {
    if (!other) return false;
    return this._value === other._value;
  }
}
