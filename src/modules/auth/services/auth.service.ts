import { authRepository, AuthRepository } from '../repositories/auth.repository';
import { passwordService, PasswordService } from './password.service';
import { tokenService, TokenService } from './token.service';
import { sessionService, SessionService } from './session.service';
import { emailService, EmailService } from './email.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import {
  DuplicateError,
  AuthenticationError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from '../../../common/errors';
import { logger } from '../../../common/logger';
import { UserStatus } from '@prisma/client';

export interface RequestMeta {
  ipAddress?: string | null | undefined;
  userAgent?: string | null | undefined;
  tenantId?: string | null | undefined;
}

export class AuthService {
  constructor(
    private repo: AuthRepository = authRepository,
    private passwords: PasswordService = passwordService,
    private tokens: TokenService = tokenService,
    private sessions: SessionService = sessionService,
    private emails: EmailService = emailService,
  ) {}

  private sanitizeUser(user: any) {
    const { passwordHash, tokenVersion, ...rest } = user;
    return rest;
  }

  private extractUserRoleNames(user: any): string[] {
    if (!user.userRoles) return [];
    return user.userRoles.map((ur: any) => ur.role?.name).filter(Boolean);
  }

  private extractUserPermissions(user: any): string[] {
    if (!user.userRoles) return [];
    const permissionsSet = new Set<string>();
    for (const ur of user.userRoles) {
      if (ur.role && ur.role.rolePermissions) {
        for (const rp of ur.role.rolePermissions) {
          if (rp.permission?.name) {
            permissionsSet.add(rp.permission.name);
          }
        }
      }
    }
    return Array.from(permissionsSet);
  }

  async register(dto: RegisterDto, meta: RequestMeta) {
    const existing = await this.repo.findUserByEmail(dto.email);
    if (existing) {
      throw new DuplicateError('An account with this email address already exists.');
    }

    const passwordHash = await this.passwords.hash(dto.password);
    const tenantId = meta.tenantId || dto.tenantId || null;

    const user = await this.repo.createUser({
      email: dto.email,
      passwordHash,
      firstName: dto.firstName || null,
      lastName: dto.lastName || null,
      tenantId,
      status: UserStatus.PENDING_VERIFICATION,
      isActive: true,
    });

    // Assign default 'CUSTOMER' or specified role if exists
    const defaultRole = await this.repo.findRoleByName('CUSTOMER');
    if (defaultRole) {
      await this.repo.assignUserRole(user.id, defaultRole.id);
    }

    // Email verification flow
    const verificationTokenPlain = this.passwords.generateRandomToken(32);
    const verificationTokenHash = this.passwords.hashRandomToken(verificationTokenPlain);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await this.repo.createEmailVerification({
      user: { connect: { id: user.id } },
      tokenHash: verificationTokenHash,
      expiresAt,
    });

    await this.emails.sendVerificationEmail(user.email, verificationTokenPlain);

    await this.emails.sendWelcomeEmail(user.email, user.firstName || undefined);

    await this.repo.createAuditLog({
      action: 'USER_REGISTER',
      actorId: user.id,
      tenantId: user.tenantId,
      metadata: { ipAddress: meta.ipAddress, userAgent: meta.userAgent },
    });

    logger.info({ userId: user.id, email: user.email }, 'User registered successfully');
    return this.sanitizeUser(user);
  }

  async login(dto: LoginDto, meta: RequestMeta) {
    const user = await this.repo.findUserByEmail(dto.email);
    if (!user || !user.passwordHash) {
      throw new AuthenticationError('Invalid email or password');
    }

    if (!user.isActive || user.status === UserStatus.SUSPENDED || user.status === UserStatus.LOCKED) {
      throw new AuthenticationError('Account is disabled or locked. Please contact support.');
    }

    const isMatch = await this.passwords.verify(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new AuthenticationError('Invalid email or password');
    }

    const roleNames = this.extractUserRoleNames(user);
    const permissions = this.extractUserPermissions(user);
    const roleIds = user.userRoles.map((ur) => ur.roleId);

    const { session, refreshTokenPlain } = await this.sessions.createSession({
      userId: user.id,
      tenantId: user.tenantId,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });

    const jwtPayload = {
      userId: user.id,
      tenantId: user.tenantId,
      roleIds,
      permissions,
      tokenVersion: user.tokenVersion,
      sessionId: session.id,
    };

    const { accessToken, refreshToken } = this.tokens.issueTokens(jwtPayload);

    await this.repo.updateUser(user.id, { updatedAt: new Date() });

    await this.repo.createAuditLog({
      action: 'USER_LOGIN',
      actorId: user.id,
      tenantId: user.tenantId,
      metadata: { ipAddress: meta.ipAddress, userAgent: meta.userAgent, sessionId: session.id },
    });

    logger.info({ userId: user.id, email: user.email }, 'User logged in successfully');

    return {
      user: this.sanitizeUser(user),
      roles: roleNames,
      permissions,
      accessToken,
      refreshToken: refreshTokenPlain || refreshToken,
    };
  }

  async refresh(refreshTokenPlain: string, meta: RequestMeta) {
    const validation = await this.sessions.validateRefreshToken(refreshTokenPlain);
    if (!validation) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    const { session, refreshTokenRecord, userId } = validation;
    const user = await this.repo.findUserById(userId);

    if (!user || !user.isActive) {
      throw new UnauthorizedError('User account is inactive');
    }

    // Revoke old refresh token (rotation)
    await this.repo.revokeRefreshToken(refreshTokenRecord.id);

    const permissions = this.extractUserPermissions(user);
    const roleIds = user.userRoles.map((ur) => ur.roleId);

    // Issue new session refresh token
    const { session: newSession, refreshTokenPlain: newRefreshPlain } = await this.sessions.createSession({
      userId: user.id,
      tenantId: user.tenantId,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });

    // Revoke previous session
    await this.sessions.revokeSession(session.id);

    const jwtPayload = {
      userId: user.id,
      tenantId: user.tenantId,
      roleIds,
      permissions,
      tokenVersion: user.tokenVersion,
      sessionId: newSession.id,
    };

    const { accessToken } = this.tokens.issueTokens(jwtPayload);

    await this.repo.createAuditLog({
      action: 'TOKEN_REFRESH',
      actorId: user.id,
      tenantId: user.tenantId,
      metadata: { ipAddress: meta.ipAddress, userAgent: meta.userAgent },
    });

    return {
      accessToken,
      refreshToken: newRefreshPlain,
    };
  }

  async logout(sessionId: string, userId?: string, meta?: RequestMeta) {
    if (sessionId) {
      await this.sessions.revokeSession(sessionId);
    }

    if (userId) {
      await this.repo.createAuditLog({
        action: 'USER_LOGOUT',
        actorId: userId,
        metadata: { ipAddress: meta?.ipAddress, userAgent: meta?.userAgent, sessionId },
      });
    }

    logger.info({ sessionId, userId }, 'User logged out');
  }

  async logoutAll(userId: string, meta?: RequestMeta) {
    await this.sessions.revokeAllUserSessions(userId);

    await this.repo.createAuditLog({
      action: 'USER_LOGOUT_ALL',
      actorId: userId,
      metadata: { ipAddress: meta?.ipAddress, userAgent: meta?.userAgent },
    });

    logger.info({ userId }, 'User logged out of all devices');
  }

  async forgotPassword(dto: ForgotPasswordDto, meta: RequestMeta) {
    const user = await this.repo.findUserByEmail(dto.email);
    if (!user) {
      // Do not reveal email existence
      logger.info({ email: dto.email }, 'Forgot password requested for non-existent email');
      return;
    }

    const resetTokenPlain = this.passwords.generateRandomToken(32);
    const resetTokenHash = this.passwords.hashRandomToken(resetTokenPlain);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await this.repo.createPasswordReset({
      user: { connect: { id: user.id } },
      tokenHash: resetTokenHash,
      expiresAt,
    });

    await this.emails.sendPasswordResetEmail(user.email, resetTokenPlain);

    await this.repo.createAuditLog({
      action: 'FORGOT_PASSWORD_REQUESTED',
      actorId: user.id,
      tenantId: user.tenantId,
      metadata: { ipAddress: meta.ipAddress, userAgent: meta.userAgent },
    });
  }

  async resetPassword(dto: ResetPasswordDto, meta: RequestMeta) {
    const tokenHash = this.passwords.hashRandomToken(dto.token);
    const record = await this.repo.findPasswordResetByHash(tokenHash);

    if (!record || record.expiresAt < new Date() || record.usedAt) {
      throw new ValidationError('Invalid or expired password reset token');
    }

    const newPasswordHash = await this.passwords.hash(dto.newPassword);

    await this.repo.updateUser(record.userId, {
      passwordHash: newPasswordHash,
      tokenVersion: { increment: 1 },
    });

    await this.repo.markPasswordResetUsed(record.id);

    // Invalidate all active sessions & refresh tokens
    await this.sessions.revokeAllUserSessions(record.userId);

    await this.repo.createAuditLog({
      action: 'PASSWORD_RESET_SUCCESS',
      actorId: record.userId,
      metadata: { ipAddress: meta.ipAddress, userAgent: meta.userAgent },
    });

    logger.info({ userId: record.userId }, 'Password reset successfully');
  }

  async verifyEmail(dto: VerifyEmailDto, meta: RequestMeta) {
    const tokenHash = this.passwords.hashRandomToken(dto.token);
    const record = await this.repo.findEmailVerificationByHash(tokenHash);

    if (!record || record.expiresAt < new Date() || record.usedAt) {
      throw new ValidationError('Invalid or expired email verification token');
    }

    await this.repo.updateUser(record.userId, {
      status: UserStatus.ACTIVE,
      isActive: true,
    });

    await this.repo.markEmailVerificationUsed(record.id);

    await this.repo.createAuditLog({
      action: 'EMAIL_VERIFIED',
      actorId: record.userId,
      metadata: { ipAddress: meta.ipAddress, userAgent: meta.userAgent },
    });

    logger.info({ userId: record.userId }, 'Email verified successfully');
  }

  async changePassword(userId: string, dto: ChangePasswordDto, meta: RequestMeta) {
    const user = await this.repo.findUserById(userId);
    if (!user || !user.passwordHash) {
      throw new NotFoundError('User not found');
    }

    const isMatch = await this.passwords.verify(dto.currentPassword, user.passwordHash);
    if (!isMatch) {
      throw new ValidationError('Current password is incorrect');
    }

    const newPasswordHash = await this.passwords.hash(dto.newPassword);

    await this.repo.updateUser(userId, {
      passwordHash: newPasswordHash,
      tokenVersion: { increment: 1 },
    });

    await this.sessions.revokeAllUserSessions(userId);

    await this.repo.createAuditLog({
      action: 'PASSWORD_CHANGED',
      actorId: userId,
      metadata: { ipAddress: meta.ipAddress, userAgent: meta.userAgent },
    });

    logger.info({ userId }, 'Password changed successfully');
  }
}

export const authService = new AuthService();
