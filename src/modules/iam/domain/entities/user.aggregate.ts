/**
 * User Aggregate Root
 * @module modules/iam/domain/entities/user.aggregate
 */

import { UserIdentifier, Email, HashedPassword, UserStatus } from '../value-objects';

export interface UserProfile {
  firstName: string;
  lastName: string;
  phoneNumber?: string | undefined;
}

export class UserAggregate {
  public readonly id: UserIdentifier;
  public readonly email: Email;
  private _password: HashedPassword;
  public profile: UserProfile;

  private _status: UserStatus;
  private _failedLoginAttempts: number = 0;
  private _lockoutUntil?: Date | undefined;
  private _lastLoginAt?: Date | undefined;
  private _isEmailVerified: boolean;
  private _totpSecret?: string | undefined;
  private _isMfaEnabled: boolean = false;
  private _passwordHistory: HashedPassword[] = [];
  private _roles: Set<string> = new Set();
  private _tenantId?: string | undefined;
  private _storeId?: string | undefined;

  constructor(
    id: UserIdentifier,
    email: Email,
    password: HashedPassword,
    profile: UserProfile,
    status: UserStatus = 'PENDING_VERIFICATION',
    isEmailVerified: boolean = false,
    tenantId?: string,
    storeId?: string
  ) {
    this.id = id;
    this.email = email;
    this._password = password;
    this.profile = profile;
    this._status = status;
    this._isEmailVerified = isEmailVerified;
    this._passwordHistory.push(password);
    this._tenantId = tenantId;
    this._storeId = storeId;
  }

  public get status(): UserStatus {
    if (this._lockoutUntil && new Date() < this._lockoutUntil) {
      return 'LOCKED';
    }
    return this._status;
  }

  public get isEmailVerified(): boolean {
    return this._isEmailVerified;
  }

  public get isMfaEnabled(): boolean {
    return this._isMfaEnabled;
  }

  public get totpSecret(): string | undefined {
    return this._totpSecret;
  }

  public get lastLoginAt(): Date | undefined {
    return this._lastLoginAt;
  }

  public get roles(): readonly string[] {
    return Array.from(this._roles);
  }

  public get tenantId(): string | undefined {
    return this._tenantId;
  }

  public get storeId(): string | undefined {
    return this._storeId;
  }

  public verifyEmail(): void {
    this._isEmailVerified = true;
    if (this._status === 'PENDING_VERIFICATION') {
      this._status = 'ACTIVE';
    }
  }

  public assignRole(roleName: string): void {
    this._roles.add(roleName);
  }

  public removeRole(roleName: string): void {
    this._roles.delete(roleName);
  }

  public hasRole(roleName: string): boolean {
    return this._roles.has(roleName);
  }

  public authenticate(password: string): boolean {
    if (this.status === 'LOCKED' || this.status === 'DISABLED') {
      return false;
    }

    const isValid = this._password.verify(password);
    if (!isValid) {
      this._failedLoginAttempts += 1;
      if (this._failedLoginAttempts >= 5) {
        this._lockoutUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minute lockout
        this._status = 'LOCKED';
      }
      return false;
    }

    this._failedLoginAttempts = 0;
    this._lockoutUntil = undefined;
    this._lastLoginAt = new Date();
    return true;
  }

  public changePassword(newPasswordStr: string): void {
    for (const oldHash of this._passwordHistory) {
      if (oldHash.verify(newPasswordStr)) {
        throw new Error('New password cannot be one of the recently used passwords');
      }
    }
    const newHash = HashedPassword.create(newPasswordStr);
    this._password = newHash;
    this._passwordHistory.push(newHash);
    if (this._passwordHistory.length > 5) {
      this._passwordHistory.shift();
    }
  }

  public enableMfa(secret: string): void {
    this._totpSecret = secret;
    this._isMfaEnabled = true;
  }

  public disableMfa(): void {
    this._totpSecret = undefined;
    this._isMfaEnabled = false;
  }
}
