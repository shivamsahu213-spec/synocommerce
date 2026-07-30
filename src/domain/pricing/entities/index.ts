import { Entity, Identifier, Percentage } from '../..';
import { ITaxClass } from '../contracts';
import { TaxCalculationStrategy } from '../types';

export class TaxClassEntity extends Entity<Identifier> implements ITaxClass {
  constructor(
    id: Identifier,
    public readonly code: string,
    public readonly rate: Percentage,
    public readonly strategy: TaxCalculationStrategy
  ) {
    super(id);
  }
}
