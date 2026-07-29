export interface MiddlewarePlaceholder {
  module: 'middleware';
  status: 'placeholder';
  description: string;
}

export const middleware_placeholder: MiddlewarePlaceholder = {
  module: 'middleware',
  status: 'placeholder',
  description: 'Reference contract placeholder for the middleware module until an implementation is registered.'
};
