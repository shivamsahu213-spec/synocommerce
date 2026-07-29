export interface CachePlaceholder {
  module: 'cache';
  status: 'placeholder';
  description: string;
}

export const cache_placeholder: CachePlaceholder = {
  module: 'cache',
  status: 'placeholder',
  description: 'Reference contract placeholder for the cache module until an implementation is registered.'
};
