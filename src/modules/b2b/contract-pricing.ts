/**
 * B2B Contract Pricing & Private Catalogs
 * @module modules/b2b/contract-pricing
 */

import { B2bContractPrice } from './types';

export class B2bContractPricingEngine {
  private readonly _contracts = new Map<string, B2bContractPrice>();

  public setContractPrice(companyId: string, sku: string, contractPriceInr: number, minQuantity = 1): B2bContractPrice {
    const key = `${companyId}_${sku}`;
    const record: B2bContractPrice = {
      companyId,
      sku,
      contractPriceInr,
      minQuantity,
    };
    this._contracts.set(key, record);
    return record;
  }

  public resolveEffectivePrice(companyId: string, sku: string, quantity: number, listPriceInr: number): number {
    const key = `${companyId}_${sku}`;
    const contract = this._contracts.get(key);

    if (contract && quantity >= contract.minQuantity) {
      return contract.contractPriceInr;
    }

    return listPriceInr;
  }
}
