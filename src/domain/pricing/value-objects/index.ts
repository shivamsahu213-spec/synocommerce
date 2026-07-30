import { Money, DateRange } from '../..';
import { IBasePrice, ISalePrice, ICompareAtPrice } from '../contracts';

export class BasePrice implements IBasePrice {
  constructor(public readonly amount: Money) {}
}

export class SalePrice implements ISalePrice {
  constructor(public readonly amount: Money, public readonly dateRange?: DateRange) {}
}

export class CompareAtPrice implements ICompareAtPrice {
  constructor(public readonly amount: Money) {}
}
