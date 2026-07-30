/**
 * IAM Value Objects
 * @module modules/iam/domain/value-objects
 */

import crypto from 'node:crypto';

export class UserIdentifier {
  public readonly value: string;
  constructor(value: string = crypto.randomUUID()) {
    this.value = value;
  }
  public equals(other: UserIdentifier): boolean {
    return this.value === other.value;
  }
}

export class RoleIdentifier {
  public readonly value: string;
  constructor(value: string) {
    this.value = value;
  }
  public equals(other: RoleIdentifier): boolean {
    return this.value === other.value;
  }
}

export class SessionIdentifier {
  public readonly value: string;
  constructor(value: string = crypto.randomUUID()) {
    this.value = value;
  }
  public equals(other: SessionIdentifier): boolean {
    return this.value === other.value;
  }
}

export class ApiKeyIdentifier {
  public readonly value: string;
  constructor(value: string = crypto.randomUUID()) {
    this.value = value;
  }
  public equals(other: ApiKeyIdentifier): boolean {
    return this.value === other.value;
  }
}

export class Email {
  private readonly _address: string;

  constructor(address: string) {
    const clean = address.trim().toLowerCase();
    if (!clean.includes('@') || !clean.includes('.') || clean.length < 5) {
      throw new Error(`Invalid email address: ${address}`);
    }
    this._address = clean;
  }

  public get value(): string {
    return this._address;
  }

  public equals(other: Email): boolean {
    return this._address === other._address;
  }
}

export class HashedPassword {
  public readonly hash: string;
  public readonly salt: string;

  constructor(hash: string, salt: string) {
    this.hash = hash;
    this.salt = salt;
  }

  public static create(password: string): HashedPassword {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return new HashedPassword(hash, salt);
  }

  public verify(password: string): boolean {
    const hashToVerify = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
    return crypto.timingSafeEqual(Buffer.from(this.hash, 'hex'), Buffer.from(hashToVerify, 'hex'));
  }
}

export type UserStatus = 'ACTIVE' | 'PENDING_VERIFICATION' | 'LOCKED' | 'DISABLED';
