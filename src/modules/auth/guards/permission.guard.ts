import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { ForbiddenError, UnauthorizedError } from '../../../common/errors';

export function permissionGuard(...requiredPermissions: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('User is not authenticated'));
    }

    const userPermissions = req.user.permissions || [];
    const hasPermission = requiredPermissions.every((perm) =>
      userPermissions.includes(perm.toLowerCase())
    );

    if (!hasPermission) {
      return next(new ForbiddenError(`Required permission(s) missing: ${requiredPermissions.join(', ')}`));
    }

    next();
  };
}
