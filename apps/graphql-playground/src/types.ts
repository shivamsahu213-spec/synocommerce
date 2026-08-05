/**
 * GraphQL Playground & Explorer Application Types
 * @module apps/graphql-playground/src/types
 */

export type PlaygroundTab = 'QUERY_RUNNER' | 'SCHEMA_EXPLORER' | 'SUBGRAPHS' | 'PERSISTED_QUERIES' | 'DOCUMENTATION';

export interface SavedQuery {
  id: string;
  name: string;
  query: string;
  variables: Record<string, any>;
}
