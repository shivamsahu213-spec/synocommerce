/**
 * Enterprise GraphQL Federation Platform Types
 * @module src/modules/graphql/types
 */

export type SubgraphName =
  | 'CATALOG'
  | 'ORDERS'
  | 'CUSTOMERS'
  | 'INVENTORY'
  | 'CHECKOUT'
  | 'PAYMENTS'
  | 'SHIPPING'
  | 'MARKETING'
  | 'ANALYTICS'
  | 'AI'
  | 'MARKETPLACE'
  | 'B2B'
  | 'OMNICHANNEL';

export interface SubgraphConfig {
  name: SubgraphName;
  url: string;
  schemaSdl: string;
  status: 'HEALTHY' | 'DEGRADED' | 'UNREACHABLE';
}

export interface GraphQlQueryRequest {
  query?: string | undefined;
  variables?: Record<string, any> | undefined;
  operationName?: string | undefined;
  extensions?: {
    persistedQuery?: {
      version: number;
      sha256Hash: string;
    } | undefined;
  } | undefined;
}

export interface QueryComplexityAnalysis {
  depth: number;
  calculatedCost: number;
  maxCostAllowed: number;
  allowed: boolean;
}

export interface GraphQlExecutionResult<T = any> {
  data?: T | undefined;
  errors?: { message: string; locations?: any[]; path?: string[] }[] | undefined;
  extensions?: {
    complexity?: QueryComplexityAnalysis | undefined;
    tracingMs?: number | undefined;
  } | undefined;
}
