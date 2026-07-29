export interface FeatureFlagsPlaceholder {
  module: 'feature-flags';
  status: 'placeholder';
  description: string;
}

export const feature_flags_placeholder: FeatureFlagsPlaceholder = {
  module: 'feature-flags',
  status: 'placeholder',
  description: 'Reference contract placeholder for the feature-flags module until an implementation is registered.'
};
