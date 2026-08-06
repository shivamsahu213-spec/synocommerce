/**
 * Tax Domain Repository Contracts
 *
 * @module domain/tax/repositories
 */

import { IBaseRepository } from '../..';
import { TaxRateAggregate } from '../aggregates';
import { ITaxJurisdiction } from '../contracts';
import { TaxIdentifier } from '../value-objects';

export interface ITaxRepository extends IBaseRepository<TaxRateAggregate, TaxIdentifier> {
  findJurisdiction(
    countryCode: string,
    stateCode?: string
  ): Promise<ITaxJurisdiction | null>;
}
