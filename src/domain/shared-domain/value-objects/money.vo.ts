import { InvalidValueObjectError } from '../errors';
import { Currency } from './currency.vo';

/**
 * Immutable Money Value Object representation.
 */
export class Money {
  private readonly _amount: number;
  private readonly _currency: Currency;

  constructor(amount: number, currency: Currency) {
    if (!Number.isFinite(amount)) {
      throw new InvalidValueObjectError('Money amount must be a finite number');
    }
    this._amount = Math.round(amount * 100) / 100;
    this._currency = currency;
  }

  public get amount(): number {
    return this._amount;
  }

  public get currency(): Currency {
    return this._currency;
  }

  public add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this._amount + other._amount, this._currency);
  }

  public subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this._amount - other._amount, this._currency);
  }

  public multiply(factor: number): Money {
    return new Money(this._amount * factor, this._currency);
  }

  public equals(other?: Money): boolean {
    if (!other) return false;
    return this._amount === other._amount && this._currency.equals(other._currency);
  }

  private assertSameCurrency(other: Money): void {
    if (!this._currency.equals(other._currency)) {
      throw new InvalidValueObjectError(
        `Currency mismatch: cannot operate on ${this._currency.code} and ${other._currency.code}`
      );
    }
  }
}
