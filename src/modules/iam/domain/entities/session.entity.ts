/**
 * Session Entity
 * @module modules/iam/domain/entities/session.entity
 */

import { SessionIdentifier, UserIdentifier } from '../value-objects';

export interface DeviceInfo {
  ipAddress: string;
  userAgent: string;
  deviceType?: string | undefined;
}

export class SessionEntity {
  public readonly id: SessionIdentifier;
  public readonly userId: UserIdentifier;
  public readonly token: string;
  public readonly deviceInfo: DeviceInfo;
  public readonly expiresAt: Date;
  public readonly createdAt: Date;

  private _lastActivityAt: Date;
  private _isRevoked: boolean = false;

  constructor(
    id: SessionIdentifier,
    userId: UserIdentifier,
    token: string,
    deviceInfo: DeviceInfo,
    expiresAt: Date,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.token = token;
    this.deviceInfo = deviceInfo;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt;
    this._lastActivityAt = createdAt;
  }

  public get lastActivityAt(): Date {
    return this._lastActivityAt;
  }

  public get isRevoked(): boolean {
    return this._isRevoked;
  }

  public get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  public get isValid(): boolean {
    return !this._isRevoked && !this.isExpired;
  }

  public touch(): void {
    this._lastActivityAt = new Date();
  }

  public revoke(): void {
    this._isRevoked = true;
  }
}
