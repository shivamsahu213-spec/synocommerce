/**
 * Infrastructure GraphQL Client Architecture Contract
 * @module infrastructure/graphql
 */

export interface IGraphQLClient {
  query<T>(query: string, variables?: Record<string, unknown>): Promise<T>;
  mutate<T>(mutation: string, variables?: Record<string, unknown>): Promise<T>;
}
