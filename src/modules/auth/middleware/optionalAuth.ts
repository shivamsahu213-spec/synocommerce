import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authenticate';
import { tokenService } from '../services/token.service';
import { authRepository } from '../repositories/auth.repository';
import { requestContext } from '../../../context/requestContext';

export async function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    let token: string | undefined;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (token) {
      const payload = tokenService.verifyAccess(token);
      const user = await authRepository.findUserById(payload.userId);
      if (user && user.isActive && user.tokenVersion === payload.tokenVersion) {
        req.user = payload;
        const store = requestContext.getStore();
        if (store) {
          store.userId = user.id;
          store.tenantId = user.tenantId || '';
          store.roles = payload.roleIds || payload.roles || [];
          store.permissions = payload.permissions || [];
        }
      }
    }
  } catch {
    // Ignore invalid token in optionalAuth
  }
  next();
}
