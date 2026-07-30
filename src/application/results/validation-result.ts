/**
 * Application Validation Result Contracts
 *
 * @module application/results/validation-result
 */

export interface ValidationErrorItem {
  readonly propertyPath: string;
  readonly message: string;
  readonly errorCode: string;
  readonly attemptedValue?: unknown;
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly ValidationErrorItem[];
}
