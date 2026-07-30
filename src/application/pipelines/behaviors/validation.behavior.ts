/**
 * Validation Pipeline Behavior Contract
 * @module application/pipelines/behaviors/validation.behavior
 */

import { IPipelineBehavior, NextPipelineDelegate } from '../pipeline.interface';
import { Result } from '../../results';
import { IValidator } from '../../validators';

export interface IValidationPipelineBehavior<TRequest, TResponse> extends IPipelineBehavior<TRequest, TResponse> {
  readonly validators: readonly IValidator<TRequest>[];
}
