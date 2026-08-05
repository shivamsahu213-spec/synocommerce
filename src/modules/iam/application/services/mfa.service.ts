/**
 * IAM Multi-Factor Authentication Service
 * @module modules/iam/application/services/mfa.service
 */

import { AuditLogEntity } from '../../domain/entities';
import { IAuditLogRepository,IUserRepository } from '../../domain/repositories';
import { UserIdentifier } from '../../domain/value-objects';
import { TotpUtil } from './totp.util';

export interface MfaEnableResultDto {
  secret: string;
  qrCodeUri: string;
}

export class MfaService {
  private readonly _userRepo: IUserRepository;
  private readonly _auditRepo: IAuditLogRepository;

  constructor(userRepo: IUserRepository, auditRepo: IAuditLogRepository) {
    this._userRepo = userRepo;
    this._auditRepo = auditRepo;
  }

  public async enableMfa(userIdStr: string): Promise<MfaEnableResultDto> {
    const user = await this._userRepo.findById(new UserIdentifier(userIdStr));
    if (!user) {
      throw new Error('User not found');
    }

    const secret = TotpUtil.generateSecret();
    user.enableMfa(secret);
    await this._userRepo.save(user);

    await this._auditRepo.save(new AuditLogEntity('MFA_ENABLED', user.id.value));

    const qrCodeUri = `otpauth://totp/SynoCommerce:${user.email.value}?secret=${secret}&issuer=SynoCommerce`;
    return { secret, qrCodeUri };
  }

  public async verifyMfa(userIdStr: string, token: string): Promise<boolean> {
    const user = await this._userRepo.findById(new UserIdentifier(userIdStr));
    if (!user || !user.isMfaEnabled || !user.totpSecret) {
      return false;
    }

    return TotpUtil.verifyTotp(user.totpSecret, token);
  }

  public async disableMfa(userIdStr: string): Promise<void> {
    const user = await this._userRepo.findById(new UserIdentifier(userIdStr));
    if (!user) {
      throw new Error('User not found');
    }

    user.disableMfa();
    await this._userRepo.save(user);

    await this._auditRepo.save(new AuditLogEntity('MFA_DISABLED', user.id.value));
  }
}
