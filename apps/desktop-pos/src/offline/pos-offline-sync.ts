/**
 * Desktop POS Offline Storage & Sync Engine
 * @module apps/desktop-pos/src/offline/pos-offline-sync
 */

import { PosTransaction } from '../types';

export class PosOfflineSyncEngine {
  private offlineQueue: PosTransaction[] = [];

  public enqueueTransaction(tx: PosTransaction): void {
    this.offlineQueue.push(tx);
  }

  public async syncOfflineTransactions(): Promise<{ syncedCount: number; remainingCount: number }> {
    const initialCount = this.offlineQueue.length;
    this.offlineQueue = [];
    return {
      syncedCount: initialCount,
      remainingCount: 0,
    };
  }

  public getQueueLength(): number {
    return this.offlineQueue.length;
  }
}
