import { BaseDomainEvent } from '../..';

export class PriceBookCreatedEvent extends BaseDomainEvent {
  public readonly eventName = 'pricebook.created';
  constructor(public readonly priceBookId: string, public readonly code: string) {
    super();
  }
}

export class CurrencyRateUpdatedEvent extends BaseDomainEvent {
  public readonly eventName = 'currency.rate.updated';
  constructor(public readonly fromCurrency: string, public readonly toCurrency: string, public readonly rate: number) {
    super();
  }
}
