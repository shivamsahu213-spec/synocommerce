/**
 * IAM Authorization Application Service
 * @module modules/iam/application/services/authorization.service
 */

import { UserIdentifier } from '../../domain/value-objects';
import { IUserRepository, IRoleRepository } from '../../domain/repositories';

export class AuthorizationService {
  private readonly _userRepo: IUserRepository;
  private readonly _roleRepo: IRoleRepository;

  constructor(userRepo: IUserRepository, roleRepo: IRoleRepository) {
    this._userRepo = userRepo;
    this._roleRepo = roleRepo;
  }

  public async isAuthorized(
    userIdStr: string,
    requiredPermission: string,
    tenantId?: string,
    storeId?: string
  ): Promise<boolean> {
    const user = await this._userRepo.findById(new UserIdentifier(userIdStr));
    if (!user || user.status !== 'ACTIVE') {
      return false;
    }

    if (tenantId && user.tenantId && user.tenantId !== tenantId) {
      return false;
    }

    if (storeId && user.storeId && user.storeId !== storeId) {
      return false;
    }

    const roles = user.roles;
    for (const roleName of roles) {
      const isAllowed = await this._evaluateRolePermission(roleName, requiredPermission);
      if (isAllowed) {
        return true;
      }
    }

    return false;
  }

  private async _evaluateRolePermission(roleName: string, permission: string): Promise<boolean> {
    const role = await this._roleRepo.findByName(roleName);
    if (!role) {
      return false;
    }

    if (role.hasPermission(permission)) {
      return true;
    }

    for (const inheritedName of role.inheritedRoles) {
      const inheritedHas = await this._evaluateRolePermission(inheritedName, permission);
      if (inheritedHas) {
        return true;
      }
    }

    return false;
  }
}
