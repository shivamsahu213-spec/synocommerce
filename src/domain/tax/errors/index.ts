/**
 * Tax Domain Errors
 *
 * @module domain/tax/errors
 */

import { DomainError } from '../..';

export class TaxError extends DomainError {
  constructor(message: string, code: string = 'TAX_ERROR') {
    super(message, code);
  }
}

export class TaxJurisdictionNotFoundError extends TaxError {
  constructor(countryCode: string) {
    super(
      `No tax jurisdiction found for country '${countryCode}'`,
      'TAX_JURISDICTION_NOT_FOUND'
    );
  }
}

export class TaxCalculationFailedError extends TaxError {
  constructor(reason: string) {
    super(`Tax calculation failed: ${reason}`, 'TAX_CALCULATION_FAILED');
  }
}

export class TaxRateInactiveError extends TaxError {
  constructor(taxRateId: string) {
    super(`Tax rate '${taxRateId}' is inactive`, 'TAX_RATE_INACTIVE');
  }
}
