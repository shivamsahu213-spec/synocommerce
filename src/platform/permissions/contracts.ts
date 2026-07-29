export interface PermissionSubject {
  id: string;
  roles: string[];
  permissions?: string[];
}

export interface PolicyContext {
  subject: PermissionSubject;
  resource: string;
  action: string;
  metadata?: Record<string, unknown>;
}

export interface PermissionEngine {
  can(context: PolicyContext): Promise<boolean> | boolean;
}

export interface RoleDefinition {
  name: string;
  permissions: string[];
}
