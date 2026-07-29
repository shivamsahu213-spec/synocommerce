export interface AnalyticsPlaceholder {
  module: 'analytics';
  status: 'placeholder';
  description: string;
}

export const analytics_placeholder: AnalyticsPlaceholder = {
  module: 'analytics',
  status: 'placeholder',
  description: 'Reference contract placeholder for the analytics module until an implementation is registered.'
};
