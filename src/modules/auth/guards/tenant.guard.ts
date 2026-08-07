import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { ForbiddenError, UnauthorizedError } from '../../../common/errors';

export function tenantGuard() {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('User is not authenticated'));
    }

    const tenantHeader = (req.headers['x-tenant-id'] as string) || req.query.tenantId;

    if (tenantHeader && req.user.tenantId && req.user.tenantId !== tenantHeader) {
      return next(new ForbiddenError('Access denied for this tenant context'));
    }

    next();
  };
}
