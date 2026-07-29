export interface HydrationPlaceholder {
  module: 'hydration';
  status: 'placeholder';
  description: string;
}

export const hydration_placeholder: HydrationPlaceholder = {
  module: 'hydration',
  status: 'placeholder',
  description: 'Reference contract placeholder for the hydration module until an implementation is registered.'
};
