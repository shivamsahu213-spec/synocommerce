import { Prisma, PrismaClient, User, Session, RefreshToken, EmailVerification, PasswordReset, AuditLog, Role } from '@prisma/client';
import { prisma as defaultPrisma } from '../../../database/prisma';

export class AuthRepository {
  private get db(): PrismaClient {
    return defaultPrisma as unknown as PrismaClient;
  }

  async findUserByEmail(email: string) {
    return this.db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        tenant: true,
        store: true,
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findUserById(id: string) {
    return this.db.user.findUnique({
      where: { id },
      include: {
        tenant: true,
        store: true,
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async createUser(data: Prisma.UserUncheckedCreateInput | Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({ data: data as any });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.db.user.update({
      where: { id },
      data,
    });
  }

  async incrementTokenVersion(userId: string): Promise<User> {
    return this.db.user.update({
      where: { id: userId },
      data: {
        tokenVersion: { increment: 1 },
      },
    });
  }

  async findRoleByName(name: string): Promise<Role | null> {
    return this.db.role.findFirst({
      where: { name },
    });
  }

  async assignUserRole(userId: string, roleId: string) {
    return this.db.userRole.upsert({
      where: {
        userId_roleId: {
          userId,
          roleId,
        },
      },
      update: {},
      create: {
        userId,
        roleId,
      },
    });
  }

  // Session Management
  async createSession(data: Prisma.SessionCreateInput): Promise<Session> {
    return this.db.session.create({ data });
  }

  async findSessionById(id: string): Promise<Session | null> {
    return this.db.session.findUnique({
      where: { id },
    });
  }

  async deleteSession(id: string): Promise<Session | null> {
    try {
      await this.db.refreshToken.deleteMany({ where: { sessionId: id } });
      return await this.db.session.delete({
        where: { id },
      });
    } catch {
      return null;
    }
  }

  async deleteAllUserSessions(userId: string): Promise<number> {
    await this.db.refreshToken.deleteMany({ where: { userId } });
    const result = await this.db.session.deleteMany({
      where: { userId },
    });
    return result.count;
  }

  // Refresh Tokens
  async createRefreshToken(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken> {
    return this.db.refreshToken.create({ data });
  }

  async findRefreshTokenByHash(tokenHash: string): Promise<RefreshToken | null> {
    return this.db.refreshToken.findFirst({
      where: {
        tokenHash,
        revokedAt: null,
      },
      include: {
        session: true,
        user: true,
      },
    });
  }

  async revokeRefreshToken(id: string): Promise<RefreshToken> {
    return this.db.refreshToken.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllUserRefreshTokens(userId: string): Promise<number> {
    const result = await this.db.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
    return result.count;
  }

  // Email Verification
  async createEmailVerification(data: Prisma.EmailVerificationCreateInput): Promise<EmailVerification> {
    return this.db.emailVerification.create({ data });
  }

  async findEmailVerificationByHash(tokenHash: string): Promise<EmailVerification | null> {
    return this.db.emailVerification.findFirst({
      where: {
        tokenHash,
        usedAt: null,
      },
    });
  }

  async markEmailVerificationUsed(id: string): Promise<EmailVerification> {
    return this.db.emailVerification.update({
      where: { id },
      data: { usedAt: new Date() },
    });
  }

  // Password Reset
  async createPasswordReset(data: Prisma.PasswordResetCreateInput): Promise<PasswordReset> {
    return this.db.passwordReset.create({ data });
  }

  async findPasswordResetByHash(tokenHash: string): Promise<PasswordReset | null> {
    return this.db.passwordReset.findFirst({
      where: {
        tokenHash,
        usedAt: null,
      },
    });
  }

  async markPasswordResetUsed(id: string): Promise<PasswordReset> {
    return this.db.passwordReset.update({
      where: { id },
      data: { usedAt: new Date() },
    });
  }

  // Audit Logs
  async createAuditLog(data: { tenantId?: string | null; actorId?: string | null; action: string; targetId?: string | null; metadata?: any }): Promise<AuditLog | null> {
    try {
      const tenantId = data.tenantId || 'default-store';
      return await this.db.auditLog.create({
        data: {
          tenantId,
          actorId: data.actorId ?? null,
          action: data.action,
          targetId: data.targetId ?? null,
          metadata: data.metadata ?? null,
        },
      });
    } catch {
      return null;
    }
  }
}

export const authRepository = new AuthRepository();
