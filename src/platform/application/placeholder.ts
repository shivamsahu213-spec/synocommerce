export interface ApplicationPlaceholder {
  module: 'application';
  status: 'placeholder';
  description: string;
}

export const application_placeholder: ApplicationPlaceholder = {
  module: 'application',
  status: 'placeholder',
  description: 'Reference contract placeholder for the application module until an implementation is registered.'
};
