/**
 * IAM Domain Repository Interfaces
 * @module modules/iam/domain/repositories
 */

import { UserAggregate, RoleEntity, SessionEntity, ApiKeyEntity, AuditLogEntity } from '../entities';
import { UserIdentifier, Email, RoleIdentifier, SessionIdentifier, ApiKeyIdentifier } from '../value-objects';

export interface IUserRepository {
  findById(id: UserIdentifier): Promise<UserAggregate | null>;
  findByEmail(email: Email): Promise<UserAggregate | null>;
  save(user: UserAggregate): Promise<void>;
}

export interface IRoleRepository {
  findByName(name: string): Promise<RoleEntity | null>;
  save(role: RoleEntity): Promise<void>;
  findAll(): Promise<readonly RoleEntity[]>;
}

export interface ISessionRepository {
  findById(id: SessionIdentifier): Promise<SessionEntity | null>;
  findByToken(token: string): Promise<SessionEntity | null>;
  findByUserId(userId: UserIdentifier): Promise<readonly SessionEntity[]>;
  save(session: SessionEntity): Promise<void>;
  delete(id: SessionIdentifier): Promise<void>;
}

export interface IApiKeyRepository {
  findById(id: ApiKeyIdentifier): Promise<ApiKeyEntity | null>;
  findByHash(keyHash: string): Promise<ApiKeyEntity | null>;
  findByUserId(userId: UserIdentifier): Promise<readonly ApiKeyEntity[]>;
  save(apiKey: ApiKeyEntity): Promise<void>;
  delete(id: ApiKeyIdentifier): Promise<void>;
}

export interface IAuditLogRepository {
  save(auditLog: AuditLogEntity): Promise<void>;
  findByUserId(userId: string): Promise<readonly AuditLogEntity[]>;
}
