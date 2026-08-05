/**
 * Change Data Capture (CDC) Stream Engine
 * @module src/modules/data-platform/cdc-engine
 */

import { CdcOperation, CdcRecord } from './types';

export class CdcEngineProcessor {
  private cdcStream: CdcRecord[] = [];

  public captureChange<T = any>(
    tableName: string,
    operation: CdcOperation,
    beforeState?: T,
    afterState?: T
  ): CdcRecord<T> {
    const cdcId = `cdc_${tableName}_${Date.now()}`;
    const record: CdcRecord<T> = {
      cdcId,
      tableName,
      operation,
      beforeState,
      afterState,
      timestamp: new Date(),
    };

    this.cdcStream.push(record);
    return record;
  }

  public getCdcStream(tableName?: string): CdcRecord[] {
    if (!tableName) return this.cdcStream;
    return this.cdcStream.filter((r) => r.tableName === tableName);
  }
}
