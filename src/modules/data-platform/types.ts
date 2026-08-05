/**
 * Enterprise Event Streaming & Data Platform Types
 * @module src/modules/data-platform/types
 */

export type PlatformDataEventType =
  | 'ORDER_CREATED'
  | 'ORDER_UPDATED'
  | 'ORDER_CANCELLED'
  | 'ORDER_REFUNDED'
  | 'PAYMENT_COMPLETED'
  | 'PAYMENT_FAILED'
  | 'CUSTOMER_CREATED'
  | 'CUSTOMER_UPDATED'
  | 'PRODUCT_CREATED'
  | 'PRODUCT_UPDATED'
  | 'INVENTORY_CHANGED'
  | 'PRICE_CHANGED'
  | 'CHECKOUT_STARTED'
  | 'CHECKOUT_COMPLETED'
  | 'LOGIN'
  | 'SEARCH'
  | 'PLUGIN_INSTALLED'
  | 'WORKFLOW_EXECUTED';

export interface DataPlatformEvent<T = any> {
  eventId: string;
  topic: string;
  partition: number;
  offset: number;
  eventType: PlatformDataEventType;
  aggregateId: string;
  version: number;
  timestamp: Date;
  payload: T;
  metadata?: Record<string, any>;
}

export interface ConsumerGroup {
  groupId: string;
  topic: string;
  currentOffset: number;
}

export interface EventSnapshot<T = any> {
  aggregateId: string;
  version: number;
  snapshotAt: Date;
  state: T;
}

export type CdcOperation = 'INSERT' | 'UPDATE' | 'DELETE';

export interface CdcRecord<T = any> {
  cdcId: string;
  tableName: string;
  operation: CdcOperation;
  beforeState?: T | undefined;
  afterState?: T | undefined;
  timestamp: Date;
}

export interface SchemaDefinition {
  schemaId: string;
  name: string;
  version: string;
  fields: { name: string; type: string; required: boolean }[];
}

export interface DataLakeRecord {
  recordId: string;
  path: string; // e.g., 'raw/2026/08/order_events.parquet'
  tier: 'RAW' | 'CURATED' | 'WAREHOUSE_EXPORT';
  format: 'PARQUET' | 'JSON' | 'AVRO';
  recordCount: number;
}

export type WarehouseTarget = 'SNOWFLAKE' | 'BIGQUERY' | 'REDSHIFT' | 'CLICKHOUSE' | 'DUCKDB';

export interface WarehouseExportJob {
  jobId: string;
  target: WarehouseTarget;
  recordsCount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  executedAt: Date;
}
