/**
 * Tax Domain Services (Ports)
 *
 * Interface-only domain / application ports. Concrete adapters belong
 * in the infrastructure layer (Avalara, TaxJar, custom engines).
 *
 * @module domain/tax/services
 */

import { Address, Money } from '../..';
import { ITaxJurisdiction } from '../contracts';
import { TaxCalculation } from '../value-objects';

/**
 * Resolves the applicable tax jurisdiction for a ship-to / bill-to address.
 */
export interface ITaxResolver {
  resolveJurisdiction(address: Address): Promise<ITaxJurisdiction | null>;
}

/**
 * Vendor-neutral tax calculation engine port.
 */
export interface ITaxEngine {
  calculateTax(
    amount: Money,
    address: Address,
    taxCategoryId?: string
  ): Promise<TaxCalculation>;
}
