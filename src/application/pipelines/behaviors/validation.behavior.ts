/**
 * Validation Pipeline Behavior Contract
 * @module application/pipelines/behaviors/validation.behavior
 */

import { Result } from '../../results';
import { IValidator } from '../../validators';
import { IPipelineBehavior, NextPipelineDelegate } from '../pipeline.interface';

export interface IValidationPipelineBehavior<TRequest, TResponse> extends IPipelineBehavior<TRequest, TResponse> {
  readonly validators: readonly IValidator<TRequest>[];
}
