/**
 * Tax Domain Contracts
 *
 * Provider-neutral interfaces describing the tax model surface.
 * Avalara / TaxJar / custom adapters implement engine ports outside the domain.
 *
 * @module domain/tax/contracts
 */

import { Money, Percentage } from '../..';
import { TaxIdentifier, TaxBreakdown } from '../value-objects';
import { TaxType } from '../types';

/** Configured tax rate for a jurisdiction. */
export interface ITaxRate {
  readonly id: TaxIdentifier;
  readonly name: string;
  readonly rate: Percentage;
  readonly taxType: TaxType;
  readonly isActive: boolean;
}

/** Geographic tax jurisdiction with applicable rates. */
export interface ITaxJurisdiction {
  readonly jurisdictionId: string;
  readonly countryCode: string;
  readonly stateCode?: string | undefined;
  readonly name: string;
  readonly rates: readonly ITaxRate[];
}

/** Rule mapping a tax category to a jurisdiction rate. */
export interface ITaxRule {
  readonly ruleId: string;
  readonly taxCategoryId: string;
  readonly jurisdictionId: string;
  readonly rate: Percentage;
  readonly taxType: TaxType;
  readonly isActive: boolean;
}

/** Product / order tax category classification. */
export interface ITaxCategory {
  readonly categoryId: string;
  readonly code: string;
  readonly name: string;
  readonly isExempt: boolean;
}

/**
 * Calculation contract mirroring the TaxCalculation value object.
 * Useful when ports return a structural shape without importing the VO type.
 */
export interface ITaxCalculation {
  readonly totalTax: Money;
  readonly breakdowns: readonly TaxBreakdown[];
  readonly isInclusive: boolean;
}
