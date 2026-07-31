/**
 * Multi-Location Store Management & Real-Time Stock Transfer
 * @module modules/omnichannel/store-inventory-sync
 */

import { StoreLocationRecord } from './types';

export class StoreInventorySyncEngine {
  private readonly _stores = new Map<string, StoreLocationRecord>();

  public registerStoreLocation(
    storeId: string,
    storeName: string,
    city: string,
    state: string,
    initialInventory: Record<string, number> = {}
  ): StoreLocationRecord {
    const record: StoreLocationRecord = {
      storeId,
      storeName,
      city,
      state,
      isFulfillmentNode: true,
      skusInventory: { ...initialInventory },
    };

    this._stores.set(storeId, record);
    return record;
  }

  public transferStockBetweenStores(
    sourceStoreId: string,
    targetStoreId: string,
    sku: string,
    quantity: number
  ): { success: boolean; sourceRemaining: number; targetTotal: number } {
    const source = this._stores.get(sourceStoreId);
    const target = this._stores.get(targetStoreId);

    if (!source || !target) {
      throw new Error('Source or Target store location not found');
    }

    const currentSourceQty = source.skusInventory[sku] ?? 0;
    if (currentSourceQty < quantity) {
      throw new Error(`Insufficient stock for '${sku}' at store '${sourceStoreId}'`);
    }

    source.skusInventory[sku] = currentSourceQty - quantity;
    target.skusInventory[sku] = (target.skusInventory[sku] ?? 0) + quantity;

    return {
      success: true,
      sourceRemaining: source.skusInventory[sku],
      targetTotal: target.skusInventory[sku],
    };
  }
}
