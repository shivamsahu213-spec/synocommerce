export interface SecurityPlaceholder {
  module: 'security';
  status: 'placeholder';
  description: string;
}

export const security_placeholder: SecurityPlaceholder = {
  module: 'security',
  status: 'placeholder',
  description: 'Reference contract placeholder for the security module until an implementation is registered.'
};
