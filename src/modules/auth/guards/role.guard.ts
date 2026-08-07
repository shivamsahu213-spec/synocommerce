import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { ForbiddenError, UnauthorizedError } from '../../../common/errors';

export function roleGuard(...requiredRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('User is not authenticated'));
    }

    const userRoles = req.user.roleIds || [];
    // User roles match if user has any of required role IDs/names
    const hasRole = requiredRoles.some((role) => userRoles.includes(role));

    if (!hasRole) {
      return next(new ForbiddenError(`Access restricted to role(s): ${requiredRoles.join(', ')}`));
    }

    next();
  };
}
