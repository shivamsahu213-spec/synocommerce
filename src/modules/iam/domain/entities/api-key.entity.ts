/**
 * API Key Entity
 * @module modules/iam/domain/entities/api-key.entity
 */

import { ApiKeyIdentifier, UserIdentifier } from '../value-objects';

export class ApiKeyEntity {
  public readonly id: ApiKeyIdentifier;
  public readonly userId: UserIdentifier;
  public readonly name: string;
  public readonly keyHash: string;
  public readonly prefix: string;
  public readonly scopes: readonly string[];
  public readonly expiresAt?: Date | undefined;
  public readonly tenantId?: string | undefined;
  public readonly storeId?: string | undefined;
  public readonly createdAt: Date;

  private _isRevoked: boolean = false;

  constructor(
    id: ApiKeyIdentifier,
    userId: UserIdentifier,
    name: string,
    keyHash: string,
    prefix: string,
    scopes: readonly string[],
    expiresAt?: Date,
    tenantId?: string,
    storeId?: string,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.keyHash = keyHash;
    this.prefix = prefix;
    this.scopes = scopes;
    this.expiresAt = expiresAt;
    this.tenantId = tenantId;
    this.storeId = storeId;
    this.createdAt = createdAt;
  }

  public get isRevoked(): boolean {
    return this._isRevoked;
  }

  public get isExpired(): boolean {
    return this.expiresAt !== undefined && new Date() > this.expiresAt;
  }

  public get isValid(): boolean {
    return !this._isRevoked && !this.isExpired;
  }

  public revoke(): void {
    this._isRevoked = true;
  }
}
