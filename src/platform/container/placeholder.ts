export interface ContainerPlaceholder {
  module: 'container';
  status: 'placeholder';
  description: string;
}

export const container_placeholder: ContainerPlaceholder = {
  module: 'container',
  status: 'placeholder',
  description: 'Reference contract placeholder for the container module until an implementation is registered.'
};
