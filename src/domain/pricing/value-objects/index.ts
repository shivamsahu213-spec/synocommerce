import { DateRange,Money } from '../..';
import { IBasePrice, ICompareAtPrice,ISalePrice } from '../contracts';

export class BasePrice implements IBasePrice {
  constructor(public readonly amount: Money) {}
}

export class SalePrice implements ISalePrice {
  constructor(public readonly amount: Money, public readonly dateRange?: DateRange | undefined) {}
}

export class CompareAtPrice implements ICompareAtPrice {
  constructor(public readonly amount: Money) {}
}
