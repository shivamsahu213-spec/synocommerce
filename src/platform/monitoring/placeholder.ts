export interface MonitoringPlaceholder {
  module: 'monitoring';
  status: 'placeholder';
  description: string;
}

export const monitoring_placeholder: MonitoringPlaceholder = {
  module: 'monitoring',
  status: 'placeholder',
  description: 'Reference contract placeholder for the monitoring module until an implementation is registered.'
};
