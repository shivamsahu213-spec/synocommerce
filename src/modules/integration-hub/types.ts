/**
 * Enterprise Integration Hub Type Definitions
 * @module modules/integration-hub/types
 */

export type SyncMode = 'FULL' | 'INCREMENTAL' | 'REAL_TIME';
export type SyncStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'DLQ';
export type ConflictStrategy = 'LATEST_WINS' | 'ERP_MASTER' | 'COMMERCE_MASTER';

export type ErpSystem = 'SAP_S4HANA' | 'SAP_B1' | 'ORACLE_ERP' | 'DYNAMICS_365' | 'ODOO' | 'ERPNEXT';
export type CrmSystem = 'SALESFORCE' | 'HUBSPOT' | 'ZOHO_CRM' | 'FRESHSALES';

export interface SyncJobRecord {
  jobId: string;
  sourceSystem: string;
  targetSystem: string;
  syncMode: SyncMode;
  status: SyncStatus;
  recordsProcessed: number;
  failuresCount: number;
  startedAt: Date;
  completedAt?: Date | undefined;
}

export interface DeadLetterRecord {
  dlqId: string;
  jobId: string;
  payload: Record<string, any>;
  errorMessage: string;
  retryAttempts: number;
  failedAt: Date;
}
