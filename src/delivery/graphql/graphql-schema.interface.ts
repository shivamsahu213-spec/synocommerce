/**
 * GraphQL Schema & Resolver Contracts
 *
 * Supports Apollo Federation readiness, DataLoaders, subscriptions, and persisted queries.
 *
 * @module delivery/graphql/graphql-schema.interface
 */

import { IDeliveryContext } from '../contracts';

export interface IGraphQLContext {
  readonly deliveryContext: IDeliveryContext;
  readonly dataLoaders: Record<string, IDataLoader<unknown, unknown>>;
}

export interface IDataLoader<TKey, TValue> {
  load(key: TKey): Promise<TValue | null>;
  loadMany(keys: readonly TKey[]): Promise<readonly (TValue | Error)[]>;
  clear(key: TKey): void;
}

export interface FederationMetadata {
  readonly serviceName: string;
  readonly version: string;
  readonly schemaSdl: string;
}

export interface IPersistedQueryStrategy {
  isPersistedQuery(queryHash: string): Promise<boolean>;
  getPersistedQuery(queryHash: string): Promise<string | undefined>;
}
