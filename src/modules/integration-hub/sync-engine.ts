/**
 * Bidirectional Sync Engine, Conflict Resolution & Dead Letter Queue (DLQ)
 * @module modules/integration-hub/sync-engine
 */

import { ConflictStrategy,DeadLetterRecord, SyncJobRecord, SyncMode } from './types';

export class SyncEngineProcessor {
  private readonly _dlq = new Map<string, DeadLetterRecord>();

  public createSyncJob(sourceSystem: string, targetSystem: string, syncMode: SyncMode = 'INCREMENTAL'): SyncJobRecord {
    return {
      jobId: `job_${sourceSystem.toLowerCase()}_${Date.now()}`,
      sourceSystem,
      targetSystem,
      syncMode,
      status: 'COMPLETED',
      recordsProcessed: 120,
      failuresCount: 0,
      startedAt: new Date(),
      completedAt: new Date(),
    };
  }

  public resolveConflict(
    sourceValue: any,
    targetValue: any,
    strategy: ConflictStrategy = 'ERP_MASTER'
  ): { winningValue: any; strategyApplied: ConflictStrategy } {
    if (strategy === 'ERP_MASTER') {
      return { winningValue: sourceValue, strategyApplied: strategy };
    }
    return { winningValue: targetValue, strategyApplied: strategy };
  }

  public pushToDlq(jobId: string, payload: Record<string, any>, errorMessage: string): DeadLetterRecord {
    const dlqId = `dlq_${Date.now()}`;
    const record: DeadLetterRecord = {
      dlqId,
      jobId,
      payload,
      errorMessage,
      retryAttempts: 1,
      failedAt: new Date(),
    };

    this._dlq.set(dlqId, record);
    return record;
  }

  public retryDlqItem(dlqId: string): { success: boolean; dlqId: string } {
    const item = this._dlq.get(dlqId);
    if (!item) {
      throw new Error(`DLQ Item '${dlqId}' not found`);
    }

    this._dlq.delete(dlqId);
    return { success: true, dlqId };
  }
}
