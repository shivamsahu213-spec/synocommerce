import { Request, Response, NextFunction } from 'express';
import { authService, AuthService } from '../services/auth.service';
import { registerSchema } from '../dto/register.dto';
import { loginSchema } from '../dto/login.dto';
import { refreshSchema } from '../dto/refresh.dto';
import { forgotPasswordSchema } from '../dto/forgot-password.dto';
import { resetPasswordSchema } from '../dto/reset-password.dto';
import { verifyEmailSchema } from '../dto/verify-email.dto';
import { changePasswordSchema } from '../dto/change-password.dto';
import { setRefreshTokenCookie, clearRefreshTokenCookie, getRefreshTokenFromReq } from '../utils/cookie';
import { AuthenticatedRequest } from '../middleware/authenticate';
import { ApiResponse } from '../../../common/response';

export class AuthController {
  constructor(private service: AuthService = authService) {}

  private extractRequestMeta(req: Request) {
    return {
      ipAddress: (req.headers['x-forwarded-for'] as string) || req.ip || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      tenantId: (req.headers['x-tenant-id'] as string) || (req.body?.tenantId as string),
    };
  }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = registerSchema.parse(req.body);
      const meta = this.extractRequestMeta(req);
      const user = await this.service.register(dto, meta);

      const response: ApiResponse = {
        success: true,
        data: {
          message: 'User registered successfully. Please check your email to verify your account.',
          user,
        },
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = loginSchema.parse(req.body);
      const meta = this.extractRequestMeta(req);
      const { user, roles, permissions, accessToken, refreshToken } = await this.service.login(dto, meta);

      setRefreshTokenCookie(res, refreshToken);

      const response: ApiResponse = {
        success: true,
        data: {
          user,
          roles,
          permissions,
          accessToken,
          refreshToken,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = refreshSchema.parse(req.body || {});
      const tokenFromReq = getRefreshTokenFromReq(req) || dto.refreshToken;

      if (!tokenFromReq) {
        res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Refresh token is missing',
          },
        });
        return;
      }

      const meta = this.extractRequestMeta(req);
      const { accessToken, refreshToken: newRefreshToken } = await this.service.refresh(tokenFromReq, meta);

      setRefreshTokenCookie(res, newRefreshToken);

      const response: ApiResponse = {
        success: true,
        data: {
          accessToken,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const meta = this.extractRequestMeta(req);
      const sessionId = req.user?.sessionId;
      const userId = req.user?.userId;

      if (sessionId) {
        await this.service.logout(sessionId, userId, meta);
      }

      clearRefreshTokenCookie(res);

      const response: ApiResponse = {
        success: true,
        data: {
          message: 'Logged out successfully',
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  logoutAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId;
      const meta = this.extractRequestMeta(req);

      if (userId) {
        await this.service.logoutAll(userId, meta);
      }

      clearRefreshTokenCookie(res);

      const response: ApiResponse = {
        success: true,
        data: {
          message: 'Logged out of all devices successfully',
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = forgotPasswordSchema.parse(req.body);
      const meta = this.extractRequestMeta(req);
      await this.service.forgotPassword(dto, meta);

      const response: ApiResponse = {
        success: true,
        data: {
          message: 'If an account exists for this email, password reset instructions have been sent.',
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto = resetPasswordSchema.parse(req.body);
      const meta = this.extractRequestMeta(req);
      await this.service.resetPassword(dto, meta);

      clearRefreshTokenCookie(res);

      const response: ApiResponse = {
        success: true,
        data: {
          message: 'Password reset successfully. You can now log in with your new password.',
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = (req.query.token as string) || req.body?.token;
      const dto = verifyEmailSchema.parse({ token });
      const meta = this.extractRequestMeta(req);
      await this.service.verifyEmail(dto, meta);

      const response: ApiResponse = {
        success: true,
        data: {
          message: 'Email address verified successfully.',
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'User is not authenticated' },
        });
        return;
      }

      const dto = changePasswordSchema.parse(req.body);
      const meta = this.extractRequestMeta(req);
      await this.service.changePassword(userId, dto, meta);

      clearRefreshTokenCookie(res);

      const response: ApiResponse = {
        success: true,
        data: {
          message: 'Password changed successfully. Please log in again with your new password.',
        },
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
