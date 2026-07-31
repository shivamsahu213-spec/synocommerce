/**
 * Enterprise Omnichannel Retail & POS Platform Type Definitions
 * @module modules/omnichannel/types
 */

export type PosRegisterStatus = 'OPEN' | 'CLOSED' | 'RECONCILED';
export type OmnichannelFulfillmentMode = 'BOPIS' | 'SHIP_FROM_STORE' | 'ENDLESS_AISLE' | 'CLICK_AND_COLLECT';
export type OfflineSyncStatus = 'QUEUED' | 'SYNCED' | 'CONFLICT';

export interface PosRegisterRecord {
  registerId: string;
  storeId: string;
  staffId: string;
  openingCashInr: number;
  closingCashInr?: number | undefined;
  status: PosRegisterStatus;
  openedAt: Date;
  closedAt?: Date | undefined;
}

export interface PosOfflineOrder {
  offlineOrderId: string;
  registerId: string;
  storeId: string;
  skus: string[];
  totalInr: number;
  syncStatus: OfflineSyncStatus;
  timestamp: Date;
}

export interface StoreLocationRecord {
  storeId: string;
  storeName: string;
  city: string;
  state: string;
  isFulfillmentNode: boolean;
  skusInventory: Record<string, number>;
}

export interface OmnichannelFulfillmentRecord {
  fulfillmentId: string;
  orderId: string;
  fulfillmentMode: OmnichannelFulfillmentMode;
  originStoreId: string;
  pickupCode?: string | undefined;
  status: 'PENDING_PICKUP' | 'SHIPPED' | 'COMPLETED';
}

export interface LoyaltyAccountRecord {
  customerId: string;
  pointsBalance: number;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';
  storeCreditInr: number;
}
