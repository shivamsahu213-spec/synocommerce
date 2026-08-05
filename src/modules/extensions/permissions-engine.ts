/**
 * Plugin Permissions & Isolation Engine
 * @module src/modules/extensions/permissions-engine
 */

export class PermissionEngineProcessor {
  public authorizePermission(grantedPermissions: string[], requiredPermission: string): boolean {
    if (grantedPermissions.includes('*') || grantedPermissions.includes('admin:*')) {
      return true;
    }
    return grantedPermissions.includes(requiredPermission);
  }

  public validateStoreTenantIsolation(storeId: string, tenantId: string, requestTenantId: string): boolean {
    return tenantId === requestTenantId;
  }
}
