/**
 * Enterprise Point of Sale (POS) & Offline Sync Engine
 * @module modules/omnichannel/pos-engine
 */

import { PosRegisterRecord, PosOfflineOrder } from './types';

export class PosRegisterEngine {
  private readonly _registers = new Map<string, PosRegisterRecord>();
  private readonly _offlineQueue: PosOfflineOrder[] = [];

  public openRegister(registerId: string, storeId: string, staffId: string, openingCashInr: number): PosRegisterRecord {
    const record: PosRegisterRecord = {
      registerId,
      storeId,
      staffId,
      openingCashInr,
      status: 'OPEN',
      openedAt: new Date(),
    };

    this._registers.set(registerId, record);
    return record;
  }

  public closeRegister(registerId: string, closingCashInr: number): PosRegisterRecord {
    const reg = this._registers.get(registerId);
    if (!reg) {
      throw new Error(`POS Register '${registerId}' not found`);
    }

    reg.closingCashInr = closingCashInr;
    reg.status = 'CLOSED';
    reg.closedAt = new Date();
    return reg;
  }

  public recordOfflineOrder(registerId: string, storeId: string, skus: string[], totalInr: number): PosOfflineOrder {
    const order: PosOfflineOrder = {
      offlineOrderId: `off_${Date.now()}`,
      registerId,
      storeId,
      skus,
      totalInr,
      syncStatus: 'QUEUED',
      timestamp: new Date(),
    };

    this._offlineQueue.push(order);
    return order;
  }

  public syncOfflineQueue(): { syncedCount: number; pendingCount: number } {
    let syncedCount = 0;

    for (const order of this._offlineQueue) {
      if (order.syncStatus === 'QUEUED') {
        order.syncStatus = 'SYNCED';
        syncedCount++;
      }
    }

    return {
      syncedCount,
      pendingCount: this._offlineQueue.filter((o) => o.syncStatus === 'QUEUED').length,
    };
  }
}
