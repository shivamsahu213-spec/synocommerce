export interface SerializationPlaceholder {
  module: 'serialization';
  status: 'placeholder';
  description: string;
}

export const serialization_placeholder: SerializationPlaceholder = {
  module: 'serialization',
  status: 'placeholder',
  description: 'Reference contract placeholder for the serialization module until an implementation is registered.'
};
