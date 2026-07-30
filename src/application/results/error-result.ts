/**
 * Application Error Result Contracts
 *
 * @module application/results/error-result
 */

import { ValidationErrorItem } from './validation-result';

export interface ApplicationErrorDetails {
  readonly code: string;
  readonly message: string;
  readonly timestamp: Date;
  readonly correlationId?: string;
  readonly validationErrors?: readonly ValidationErrorItem[];
  readonly metadata?: Record<string, unknown>;
}

export interface ErrorResult {
  readonly isError: true;
  readonly error: ApplicationErrorDetails;
}
