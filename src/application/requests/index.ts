/**
 * Application Request Wrappers
 * @module application/requests
 */

import { ExecutionContext } from '../types';

export interface CommandRequest<TBody> {
  readonly body: TBody;
  readonly context: ExecutionContext;
  readonly idempotencyKey?: string | undefined;
}

export interface QueryRequest<TParams = Record<string, unknown>> {
  readonly params: TParams;
  readonly context: ExecutionContext;
}
