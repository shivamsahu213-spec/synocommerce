import { Currency,IBaseRepository, Identifier } from '../..';
import { PriceBookAggregate } from '../aggregates';
import { ICurrencyConversion,IPriceRule, ITaxClass } from '../contracts';

export interface IPriceBookRepository extends IBaseRepository<PriceBookAggregate, Identifier> {
  findByCode(code: string): Promise<PriceBookAggregate | null>;
}

export interface IPriceRuleRepository {
  findActiveRules(): Promise<readonly IPriceRule[]>;
}

export interface ITaxClassRepository {
  findByCode(code: string): Promise<ITaxClass | null>;
}

export interface ICurrencyConversionRepository {
  getRate(from: Currency, to: Currency): Promise<ICurrencyConversion | null>;
}
