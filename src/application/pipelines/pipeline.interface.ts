/**
 * Pipeline & Pipeline Behavior Interfaces
 *
 * Implements a middleware pipeline for command & query processing.
 *
 * @module application/pipelines/pipeline.interface
 */

import { Result } from '../results';

export interface NextPipelineDelegate<TResponse> {
  (): Promise<Result<TResponse>>;
}

export interface IPipelineBehavior<TRequest, TResponse> {
  readonly behaviorName: string;
  readonly priority: number;
  handle(request: TRequest, next: NextPipelineDelegate<TResponse>): Promise<Result<TResponse>>;
}

export interface IPipeline<TRequest, TResponse> {
  registerBehavior(behavior: IPipelineBehavior<TRequest, TResponse>): void;
  execute(request: TRequest, finalHandler: NextPipelineDelegate<TResponse>): Promise<Result<TResponse>>;
}
