/**
 * Role Entity
 * @module modules/iam/domain/entities/role.entity
 */

import { RoleIdentifier } from '../value-objects';

export class RoleEntity {
  public readonly id: RoleIdentifier;
  public readonly name: string;
  public readonly description: string;
  private readonly _permissions: Set<string> = new Set();
  private readonly _inheritedRoles: Set<string> = new Set();

  constructor(
    id: RoleIdentifier,
    name: string,
    description: string,
    permissions: readonly string[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    permissions.forEach((p) => this._permissions.add(p));
  }

  public get permissions(): readonly string[] {
    return Array.from(this._permissions);
  }

  public get inheritedRoles(): readonly string[] {
    return Array.from(this._inheritedRoles);
  }

  public addPermission(permission: string): void {
    this._permissions.add(permission);
  }

  public removePermission(permission: string): void {
    this._permissions.delete(permission);
  }

  public inheritRole(parentRoleName: string): void {
    this._inheritedRoles.add(parentRoleName);
  }

  public hasPermission(permission: string): boolean {
    if (this._permissions.has(permission) || this._permissions.has('*')) {
      return true;
    }
    const [domain] = permission.split(':');
    return this._permissions.has(`${domain}:*`);
  }
}
