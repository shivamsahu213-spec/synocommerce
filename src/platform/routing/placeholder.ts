export interface RoutingPlaceholder {
  module: 'routing';
  status: 'placeholder';
  description: string;
}

export const routing_placeholder: RoutingPlaceholder = {
  module: 'routing',
  status: 'placeholder',
  description: 'Reference contract placeholder for the routing module until an implementation is registered.'
};
