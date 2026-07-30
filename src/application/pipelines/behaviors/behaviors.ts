/**
 * Pipeline Behavior Contracts
 * @module application/pipelines/behaviors/behaviors.ts
 */

import { IPipelineBehavior } from '../pipeline.interface';

export interface IAuthorizationPipelineBehavior<TRequest, TResponse> extends IPipelineBehavior<TRequest, TResponse> {}
export interface ILoggingPipelineBehavior<TRequest, TResponse> extends IPipelineBehavior<TRequest, TResponse> {}
export interface ITransactionPipelineBehavior<TRequest, TResponse> extends IPipelineBehavior<TRequest, TResponse> {}
export interface ICachingPipelineBehavior<TRequest, TResponse> extends IPipelineBehavior<TRequest, TResponse> {}
export interface IMetricsPipelineBehavior<TRequest, TResponse> extends IPipelineBehavior<TRequest, TResponse> {}
export interface IRetryPipelineBehavior<TRequest, TResponse> extends IPipelineBehavior<TRequest, TResponse> {}
export interface IIdempotencyPipelineBehavior<TRequest, TResponse> extends IPipelineBehavior<TRequest, TResponse> {}
export interface IAuditPipelineBehavior<TRequest, TResponse> extends IPipelineBehavior<TRequest, TResponse> {}
