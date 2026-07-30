/**
 * Tax Domain Policies
 *
 * @module domain/tax/policies
 */

import { Address, IDomainPolicy } from '../..';
import { TaxRateAggregate } from '../aggregates';

export interface ITaxPolicy extends IDomainPolicy<Address> {
  isTaxExempt(customerTaxId?: string): boolean;
  canApplyRate(rate: TaxRateAggregate, address: Address): boolean;
}
