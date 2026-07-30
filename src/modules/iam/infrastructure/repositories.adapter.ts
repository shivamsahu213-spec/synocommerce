/**
 * IAM Infrastructure Repository Adapters
 * @module modules/iam/infrastructure/repositories.adapter
 */

import {
  UserAggregate,
  RoleEntity,
  SessionEntity,
  ApiKeyEntity,
  AuditLogEntity,
  IUserRepository,
  IRoleRepository,
  ISessionRepository,
  IApiKeyRepository,
  IAuditLogRepository,
  UserIdentifier,
  Email,
  RoleIdentifier,
  SessionIdentifier,
  ApiKeyIdentifier,
} from '../domain';

export class InMemoryUserRepositoryAdapter implements IUserRepository {
  private readonly _store = new Map<string, UserAggregate>();

  public async findById(id: UserIdentifier): Promise<UserAggregate | null> {
    return this._store.get(id.value) ?? null;
  }

  public async findByEmail(email: Email): Promise<UserAggregate | null> {
    return Array.from(this._store.values()).find((u) => u.email.equals(email)) ?? null;
  }

  public async save(user: UserAggregate): Promise<void> {
    this._store.set(user.id.value, user);
  }
}

export class InMemoryRoleRepositoryAdapter implements IRoleRepository {
  private readonly _store = new Map<string, RoleEntity>();

  constructor() {
    // Seed default roles
    const admin = new RoleEntity(new RoleIdentifier('admin'), 'admin', 'Administrator with full access', ['*']);
    const customer = new RoleEntity(new RoleIdentifier('customer'), 'customer', 'Standard Customer', [
      'cart:*',
      'orders:read',
      'orders:create',
      'me:read',
      'me:write',
    ]);
    this._store.set('admin', admin);
    this._store.set('customer', customer);
  }

  public async findByName(name: string): Promise<RoleEntity | null> {
    return this._store.get(name) ?? null;
  }

  public async save(role: RoleEntity): Promise<void> {
    this._store.set(role.name, role);
  }

  public async findAll(): Promise<readonly RoleEntity[]> {
    return Array.from(this._store.values());
  }
}

export class InMemorySessionRepositoryAdapter implements ISessionRepository {
  private readonly _store = new Map<string, SessionEntity>();

  public async findById(id: SessionIdentifier): Promise<SessionEntity | null> {
    return this._store.get(id.value) ?? null;
  }

  public async findByToken(token: string): Promise<SessionEntity | null> {
    return Array.from(this._store.values()).find((s) => s.token === token) ?? null;
  }

  public async findByUserId(userId: UserIdentifier): Promise<readonly SessionEntity[]> {
    return Array.from(this._store.values()).filter((s) => s.userId.equals(userId));
  }

  public async save(session: SessionEntity): Promise<void> {
    this._store.set(session.id.value, session);
  }

  public async delete(id: SessionIdentifier): Promise<void> {
    this._store.delete(id.value);
  }
}

export class InMemoryApiKeyRepositoryAdapter implements IApiKeyRepository {
  private readonly _store = new Map<string, ApiKeyEntity>();

  public async findById(id: ApiKeyIdentifier): Promise<ApiKeyEntity | null> {
    return this._store.get(id.value) ?? null;
  }

  public async findByHash(keyHash: string): Promise<ApiKeyEntity | null> {
    return Array.from(this._store.values()).find((k) => k.keyHash === keyHash) ?? null;
  }

  public async findByUserId(userId: UserIdentifier): Promise<readonly ApiKeyEntity[]> {
    return Array.from(this._store.values()).filter((k) => k.userId.equals(userId));
  }

  public async save(apiKey: ApiKeyEntity): Promise<void> {
    this._store.set(apiKey.id.value, apiKey);
  }

  public async delete(id: ApiKeyIdentifier): Promise<void> {
    this._store.delete(id.value);
  }
}

export class InMemoryAuditLogRepositoryAdapter implements IAuditLogRepository {
  private readonly _logs: AuditLogEntity[] = [];

  public async save(auditLog: AuditLogEntity): Promise<void> {
    this._logs.push(auditLog);
  }

  public async findByUserId(userId: string): Promise<readonly AuditLogEntity[]> {
    return this._logs.filter((l) => l.userId === userId);
  }
}
