/**
 * SynoCommerce Enterprise Migration Engine
 * @module src/modules/migration/migration-engine
 */

import crypto from 'node:crypto';
import {
  MigrationJobConfig,
  MigrationJobProgress,
  MigrationSourcePlatform,
  RollbackSnapshot,
} from './types';

export class SynoMigrationEngine {
  private jobs = new Map<string, MigrationJobProgress>();
  private snapshots = new Map<string, RollbackSnapshot>();

  public createMigrationJob(sourcePlatform: MigrationSourcePlatform, rawPayload: string): MigrationJobConfig {
    const jobId = `mig_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const checksum = crypto.createHash('sha256').update(rawPayload).digest('hex');

    const config: MigrationJobConfig = {
      jobId,
      sourcePlatform,
      entities: ['PRODUCTS', 'CUSTOMERS', 'ORDERS'],
      fieldMappings: [
        { sourceField: 'product_name', targetField: 'name' },
        { sourceField: 'price', targetField: 'priceUsd' },
      ],
      checksumSha256: checksum,
    };

    this.jobs.set(jobId, {
      jobId,
      totalRecords: 0,
      importedRecords: 0,
      skippedRecords: 0,
      failedRecords: 0,
      progressPercentage: 0,
      status: 'PENDING',
      errors: [],
    });

    return config;
  }

  public validateRecords(records: Record<string, any>[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const skus = new Set<string>();

    records.forEach((r, idx) => {
      if (!r.name && !r.product_name) {
        errors.push(`Record #${idx}: Missing required product name`);
      }
      if (r.sku) {
        if (skus.has(r.sku)) {
          errors.push(`Record #${idx}: Duplicate SKU detected '${r.sku}'`);
        }
        skus.add(r.sku);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  public async executeImportJob(config: MigrationJobConfig, records: Record<string, any>[]): Promise<MigrationJobProgress> {
    const progress = this.jobs.get(config.jobId);
    if (!progress) throw new Error('MIGRATION_JOB_NOT_FOUND');

    progress.status = 'IN_PROGRESS';
    progress.totalRecords = records.length;

    const createdIds: { entityType: any; id: string }[] = [];

    records.forEach((rec, idx) => {
      if (!rec.name && !rec.product_name) {
        progress.failedRecords += 1;
        progress.errors.push({ recordId: `rec_${idx}`, message: 'MISSING_NAME' });
      } else {
        progress.importedRecords += 1;
        createdIds.push({ entityType: 'PRODUCTS', id: `prod_mig_${idx}` });
      }
    });

    progress.progressPercentage = Math.round(((progress.importedRecords + progress.failedRecords) / progress.totalRecords) * 100);
    progress.status = progress.failedRecords === 0 ? 'COMPLETED' : 'COMPLETED';

    // Create rollback snapshot
    const snapshot: RollbackSnapshot = {
      snapshotId: `snap_${config.jobId}`,
      jobId: config.jobId,
      createdAt: new Date(),
      createdEntityIds: createdIds,
    };
    this.snapshots.set(config.jobId, snapshot);

    return progress;
  }

  public rollbackMigration(jobId: string): { rolledBack: boolean; deletedCount: number } {
    const snapshot = this.snapshots.get(jobId);
    const progress = this.jobs.get(jobId);

    if (!snapshot || !progress) throw new Error('SNAPSHOT_NOT_FOUND');

    const count = snapshot.createdEntityIds.length;
    progress.status = 'ROLLED_BACK';
    progress.importedRecords = 0;

    return {
      rolledBack: true,
      deletedCount: count,
    };
  }

  public getJobProgress(jobId: string): MigrationJobProgress | undefined {
    return this.jobs.get(jobId);
  }
}
