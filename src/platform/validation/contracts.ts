export interface ValidationIssue {
  path: string;
  message: string;
  code: string;
}

export interface ValidationResult<TValue> {
  success: boolean;
  data?: TValue;
  issues?: ValidationIssue[];
}

export interface Validator<TValue> {
  validate(input: unknown): ValidationResult<TValue>;
}
