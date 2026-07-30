/**
 * GraphQL Resolver Interfaces
 * @module delivery/resolvers/resolver.interface
 */

import { IGraphQLContext } from '../graphql';

export interface IQueryResolver<TArgs, TResult> {
  resolve(parent: unknown, args: TArgs, context: IGraphQLContext): Promise<TResult>;
}

export interface IMutationResolver<TArgs, TResult> {
  resolve(parent: unknown, args: TArgs, context: IGraphQLContext): Promise<TResult>;
}

export interface ISubscriptionResolver<TArgs, TResult> {
  subscribe(parent: unknown, args: TArgs, context: IGraphQLContext): AsyncIterator<TResult>;
}
