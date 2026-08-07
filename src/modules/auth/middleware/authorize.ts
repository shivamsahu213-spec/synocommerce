import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authenticate';
import { ForbiddenError, UnauthorizedError } from '../../../common/errors';

export function authorize(...requiredPermissions: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('User is not authenticated'));
    }

    const userPermissions = req.user.permissions || [];
    const hasPermission = requiredPermissions.every((perm) => {
      const parts = perm.toLowerCase().split('.');
      const resource = parts[0];
      return (
        userPermissions.includes(perm.toLowerCase()) ||
        userPermissions.includes(`${resource}.manage`) ||
        userPermissions.includes('*.manage') ||
        userPermissions.includes('*.*')
      );
    });

    if (!hasPermission) {
      return next(new ForbiddenError(`Required permission(s) missing: ${requiredPermissions.join(', ')}`));
    }

    next();
  };
}
