export interface ValidationPlaceholder {
  module: 'validation';
  status: 'placeholder';
  description: string;
}

export const validation_placeholder: ValidationPlaceholder = {
  module: 'validation',
  status: 'placeholder',
  description: 'Reference contract placeholder for the validation module until an implementation is registered.'
};
