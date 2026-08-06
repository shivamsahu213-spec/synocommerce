import { AggregateRoot, Currency,Identifier } from '../..';
import { IPriceBook } from '../contracts';

export class PriceBookAggregate extends AggregateRoot<Identifier> implements IPriceBook {
  private _code: string;
  private _currency: Currency;
  private _isActive: boolean;

  constructor(id: Identifier, code: string, currency: Currency, isActive = true) {
    super(id);
    this._code = code;
    this._currency = currency;
    this._isActive = isActive;
  }

  public get code(): string { return this._code; }
  public get currency(): Currency { return this._currency; }
  public get isActive(): boolean { return this._isActive; }
}
