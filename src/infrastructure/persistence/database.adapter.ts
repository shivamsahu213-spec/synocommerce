/**
 * Database & Persistence Adapter Contracts
 *
 * Provides database-agnostic interfaces for SQL, NoSQL, Document,
 * Blob Storage, Cache, and Event Store drivers.
 *
 * @module infrastructure/persistence/database.adapter
 */

export interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
}

export interface IDatabaseAdapter extends IDatabaseConnection {}

export interface ISqlDatabaseAdapter extends IDatabaseConnection {
  query<T>(sql: string, params?: readonly unknown[]): Promise<readonly T[]>;
  execute(sql: string, params?: readonly unknown[]): Promise<number>;
}

export interface INoSqlDatabaseAdapter extends IDatabaseConnection {
  find<T>(collection: string, query: Record<string, unknown>): Promise<readonly T[]>;
  insertOne<T>(collection: string, document: T): Promise<string>;
  updateOne<T>(collection: string, id: string, update: Partial<T>): Promise<boolean>;
  deleteOne(collection: string, id: string): Promise<boolean>;
}

export interface IDocumentDatabaseAdapter extends INoSqlDatabaseAdapter {}

export interface IBlobDatabaseAdapter extends IDatabaseConnection {
  put(key: string, data: Uint8Array): Promise<void>;
  get(key: string): Promise<Uint8Array | undefined>;
  delete(key: string): Promise<void>;
}

export interface IEventStoreAdapter extends IDatabaseConnection {
  appendEvent(streamId: string, eventName: string, eventData: Record<string, unknown>): Promise<void>;
  readStream(streamId: string, fromVersion?: number): Promise<readonly { eventName: string; eventData: Record<string, unknown>; version: number }[]>;
}
