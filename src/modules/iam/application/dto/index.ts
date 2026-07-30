/**
 * IAM Application DTOs
 * @module modules/iam/application/dto
 */

export interface RegisterUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | undefined;
  tenantId?: string | undefined;
  storeId?: string | undefined;
}

export interface LoginUserDto {
  email: string;
  password: string;
  ipAddress?: string | undefined;
  userAgent?: string | undefined;
}

export interface AuthResponseDto {
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  isMfaRequired: boolean;
}

export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  isEmailVerified: boolean;
  isMfaEnabled: boolean;
  roles: readonly string[];
  lastLoginAt?: Date | undefined;
}

export interface SessionResponseDto {
  id: string;
  userId: string;
  ipAddress: string;
  userAgent: string;
  lastActivityAt: Date;
  expiresAt: Date;
  isCurrent?: boolean | undefined;
}

export interface CreateApiKeyDto {
  userId: string;
  name: string;
  scopes: readonly string[];
  expiresInDays?: number | undefined;
  tenantId?: string | undefined;
  storeId?: string | undefined;
}

export interface ApiKeyResponseDto {
  id: string;
  name: string;
  rawKey?: string | undefined; // returned only upon creation
  prefix: string;
  scopes: readonly string[];
  expiresAt?: Date | undefined;
  createdAt: Date;
}
