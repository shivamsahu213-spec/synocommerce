/**
 * Tax Domain Value Objects
 *
 * @module domain/tax/value-objects
 */

import { Identifier, Money, Percentage } from '../..';

/** Strongly-typed identity for TaxRateAggregate. */
export class TaxIdentifier extends Identifier {}

/**
 * Immutable per-jurisdiction tax line produced during calculation.
 */
export interface TaxBreakdown {
  readonly jurisdictionName: string;
  readonly taxRate: Percentage;
  readonly taxAmount: Money;
}

/**
 * Immutable result of a tax engine evaluation.
 */
export interface TaxCalculation {
  readonly totalTax: Money;
  readonly breakdowns: readonly TaxBreakdown[];
  readonly isInclusive: boolean;
}
