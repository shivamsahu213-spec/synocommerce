export interface HttpPlaceholder {
  module: 'http';
  status: 'placeholder';
  description: string;
}

export const http_placeholder: HttpPlaceholder = {
  module: 'http',
  status: 'placeholder',
  description: 'Reference contract placeholder for the http module until an implementation is registered.'
};
