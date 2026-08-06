/**
 * IAM Authentication Application Service
 * @module modules/iam/application/services/auth.service
 */

import crypto from 'node:crypto';

import { AuditLogEntity,SessionEntity, UserAggregate } from '../../domain/entities';
import { IAuditLogRepository,ISessionRepository, IUserRepository } from '../../domain/repositories';
import { Email, HashedPassword, SessionIdentifier,UserIdentifier } from '../../domain/value-objects';
import { AuthResponseDto, LoginUserDto, RegisterUserDto, UserResponseDto } from '../dto';

export class AuthenticationService {
  private readonly _userRepo: IUserRepository;
  private readonly _sessionRepo: ISessionRepository;
  private readonly _auditRepo: IAuditLogRepository;

  constructor(
    userRepo: IUserRepository,
    sessionRepo: ISessionRepository,
    auditRepo: IAuditLogRepository
  ) {
    this._userRepo = userRepo;
    this._sessionRepo = sessionRepo;
    this._auditRepo = auditRepo;
  }

  public async register(dto: RegisterUserDto): Promise<UserResponseDto> {
    const email = new Email(dto.email);
    const existing = await this._userRepo.findByEmail(email);
    if (existing) {
      throw new Error(`User with email '${dto.email}' already exists`);
    }

    const hashedPassword = HashedPassword.create(dto.password);
    const userId = new UserIdentifier();
    const user = new UserAggregate(
      userId,
      email,
      hashedPassword,
      { firstName: dto.firstName, lastName: dto.lastName, phoneNumber: dto.phoneNumber },
      'PENDING_VERIFICATION',
      false,
      dto.tenantId,
      dto.storeId
    );

    user.assignRole('customer');
    await this._userRepo.save(user);

    await this._auditRepo.save(
      new AuditLogEntity('USER_REGISTERED', userId.value, undefined, { email: email.value })
    );

    return this._mapUserToDto(user);
  }

  public async login(dto: LoginUserDto): Promise<AuthResponseDto> {
    const email = new Email(dto.email);
    const user = await this._userRepo.findByEmail(email);

    if (!user) {
      await this._auditRepo.save(new AuditLogEntity('USER_LOGIN_FAILED', undefined, dto.ipAddress, { email: dto.email, reason: 'USER_NOT_FOUND' }));
      throw new Error('Invalid email or password');
    }

    const isSuccess = user.authenticate(dto.password);
    await this._userRepo.save(user);

    if (!isSuccess) {
      await this._auditRepo.save(new AuditLogEntity('USER_LOGIN_FAILED', user.id.value, dto.ipAddress, { email: dto.email, reason: 'INVALID_PASSWORD' }));
      throw new Error('Invalid email or password');
    }

    if (user.isMfaEnabled) {
      return {
        userId: user.id.value,
        email: user.email.value,
        accessToken: '',
        refreshToken: '',
        expiresIn: 0,
        isMfaRequired: true,
      };
    }

    const accessToken = crypto.randomBytes(32).toString('hex');
    const refreshToken = crypto.randomBytes(32).toString('hex');
    const session = new SessionEntity(
      new SessionIdentifier(),
      user.id,
      accessToken,
      { ipAddress: dto.ipAddress || '127.0.0.1', userAgent: dto.userAgent || 'unknown' },
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    );

    await this._sessionRepo.save(session);
    await this._auditRepo.save(new AuditLogEntity('USER_LOGIN_SUCCESS', user.id.value, dto.ipAddress));

    return {
      userId: user.id.value,
      email: user.email.value,
      accessToken,
      refreshToken,
      expiresIn: 86400,
      isMfaRequired: false,
    };
  }

  public async logout(accessToken: string): Promise<void> {
    const session = await this._sessionRepo.findByToken(accessToken);
    if (session) {
      session.revoke();
      await this._sessionRepo.save(session);
      await this._auditRepo.save(new AuditLogEntity('USER_LOGOUT', session.userId.value));
    }
  }

  public async verifyEmail(userIdStr: string): Promise<void> {
    const user = await this._userRepo.findById(new UserIdentifier(userIdStr));
    if (!user) {
      throw new Error('User not found');
    }
    user.verifyEmail();
    await this._userRepo.save(user);
  }

  public async changePassword(userIdStr: string, currentPasswordStr: string, newPasswordStr: string): Promise<void> {
    const user = await this._userRepo.findById(new UserIdentifier(userIdStr));
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.authenticate(currentPasswordStr)) {
      throw new Error('Current password is incorrect');
    }
    user.changePassword(newPasswordStr);
    await this._userRepo.save(user);
    await this._auditRepo.save(new AuditLogEntity('PASSWORD_CHANGED', user.id.value));
  }

  public async getUserById(userIdStr: string): Promise<UserResponseDto> {
    const user = await this._userRepo.findById(new UserIdentifier(userIdStr));
    if (!user) {
      throw new Error('User not found');
    }
    return this._mapUserToDto(user);
  }

  private _mapUserToDto(user: UserAggregate): UserResponseDto {
    return {
      id: user.id.value,
      email: user.email.value,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
      isMfaEnabled: user.isMfaEnabled,
      roles: user.roles,
      lastLoginAt: user.lastLoginAt,
    };
  }
}
