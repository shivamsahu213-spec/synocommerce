/**
 * Application Authorization Contracts
 *
 * Declarative role- and permission-based authorization engine contracts.
 *
 * @module application/authorization/authorization.interface
 */

export type ApplicationRole = 'ADMIN' | 'STORE_MANAGER' | 'CUSTOMER_SERVICE' | 'CUSTOMER' | 'GUEST' | 'SYSTEM';

export type ApplicationPermission =
  | 'catalog:read'
  | 'catalog:write'
  | 'cart:read'
  | 'cart:write'
  | 'checkout:create'
  | 'order:read'
  | 'order:write'
  | 'payment:authorize'
  | 'payment:capture'
  | 'shipping:create'
  | 'returns:manage'
  | 'refunds:approve'
  | 'invoice:read'
  | 'invoice:write';

export interface IPermissionEvaluator {
  hasPermission(userPermissions: readonly string[], requiredPermission: ApplicationPermission): boolean;
  hasRole(userRoles: readonly string[], requiredRole: ApplicationRole): boolean;
}

export interface IAuthorizationPolicy {
  readonly policyName: string;
  readonly requiredRoles: readonly ApplicationRole[];
  readonly requiredPermissions: readonly ApplicationPermission[];
}

export interface IAuthorizationService {
  authorize(userId: string | undefined, roles: readonly string[], permissions: readonly string[], policy: IAuthorizationPolicy): Promise<boolean>;
}
