export interface LoggingPlaceholder {
  module: 'logging';
  status: 'placeholder';
  description: string;
}

export const logging_placeholder: LoggingPlaceholder = {
  module: 'logging',
  status: 'placeholder',
  description: 'Reference contract placeholder for the logging module until an implementation is registered.'
};
