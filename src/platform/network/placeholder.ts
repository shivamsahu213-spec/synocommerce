export interface NetworkPlaceholder {
  module: 'network';
  status: 'placeholder';
  description: string;
}

export const network_placeholder: NetworkPlaceholder = {
  module: 'network',
  status: 'placeholder',
  description: 'Reference contract placeholder for the network module until an implementation is registered.'
};
