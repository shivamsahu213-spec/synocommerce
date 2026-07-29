export interface TelemetryPlaceholder {
  module: 'telemetry';
  status: 'placeholder';
  description: string;
}

export const telemetry_placeholder: TelemetryPlaceholder = {
  module: 'telemetry',
  status: 'placeholder',
  description: 'Reference contract placeholder for the telemetry module until an implementation is registered.'
};
