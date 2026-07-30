/**
 * Tax Domain Repository Contracts
 *
 * @module domain/tax/repositories
 */

import { IBaseRepository } from '../..';
import { TaxIdentifier } from '../value-objects';
import { TaxRateAggregate } from '../aggregates';
import { ITaxJurisdiction } from '../contracts';

export interface ITaxRepository extends IBaseRepository<TaxRateAggregate, TaxIdentifier> {
  findJurisdiction(
    countryCode: string,
    stateCode?: string
  ): Promise<ITaxJurisdiction | null>;
}
