/**
 * Application CQRS Query Contracts
 * @module application/queries/query.interface
 */

import { QueryOptions } from '../types';

export interface IQuery<TResult> {
  readonly queryName: string;
  readonly options?: QueryOptions | undefined;
}
