export interface PermissionsPlaceholder {
  module: 'permissions';
  status: 'placeholder';
  description: string;
}

export const permissions_placeholder: PermissionsPlaceholder = {
  module: 'permissions',
  status: 'placeholder',
  description: 'Reference contract placeholder for the permissions module until an implementation is registered.'
};
