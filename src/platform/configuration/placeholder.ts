export interface ConfigurationPlaceholder {
  module: 'configuration';
  status: 'placeholder';
  description: string;
}

export const configuration_placeholder: ConfigurationPlaceholder = {
  module: 'configuration',
  status: 'placeholder',
  description: 'Reference contract placeholder for the configuration module until an implementation is registered.'
};
