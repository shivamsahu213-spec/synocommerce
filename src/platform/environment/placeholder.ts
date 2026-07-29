export interface EnvironmentPlaceholder {
  module: 'environment';
  status: 'placeholder';
  description: string;
}

export const environment_placeholder: EnvironmentPlaceholder = {
  module: 'environment',
  status: 'placeholder',
  description: 'Reference contract placeholder for the environment module until an implementation is registered.'
};
