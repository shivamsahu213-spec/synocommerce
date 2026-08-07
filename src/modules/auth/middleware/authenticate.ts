import { Request, Response, NextFunction } from 'express';
import { tokenService } from '../services/token.service';
import { authRepository } from '../repositories/auth.repository';
import { UnauthorizedError } from '../../../common/errors';
import { requestContext } from '../../../context/requestContext';
import { JwtPayload } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new UnauthorizedError('Authentication token is missing');
    }

    const payload = tokenService.verifyAccess(token);

    const user = await authRepository.findUserById(payload.userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedError('User account is inactive or disabled');
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedError('Token has been invalidated. Please log in again.');
    }

    req.user = payload;

    // Update AsyncLocalStorage context if running within requestContext
    const store = requestContext.getStore();
    if (store) {
      store.userId = user.id;
      store.tenantId = user.tenantId || '';
      store.roles = payload.roleIds;
      store.permissions = payload.permissions;
    }

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      next(error);
    } else {
      next(new UnauthorizedError('Invalid authentication token'));
    }
  }
}
