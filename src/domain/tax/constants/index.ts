/**
 * Tax Domain Constants
 *
 * @module domain/tax/constants
 */

import { TaxType } from '../types';

export const DEFAULT_TAX_TYPE: TaxType = 'SALES_TAX';

/** Default number of days a tax rate snapshot remains valid for audit. */
export const DEFAULT_TAX_RATE_VALIDITY_DAYS = 365;
