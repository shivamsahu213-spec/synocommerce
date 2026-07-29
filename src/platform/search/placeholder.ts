export interface SearchPlaceholder {
  module: 'search';
  status: 'placeholder';
  description: string;
}

export const search_placeholder: SearchPlaceholder = {
  module: 'search',
  status: 'placeholder',
  description: 'Reference contract placeholder for the search module until an implementation is registered.'
};
