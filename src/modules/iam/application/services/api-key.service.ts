/**
 * IAM API Key Application Service
 * @module modules/iam/application/services/api-key.service
 */

import crypto from 'node:crypto';
import { UserIdentifier, ApiKeyIdentifier } from '../../domain/value-objects';
import { ApiKeyEntity, AuditLogEntity } from '../../domain/entities';
import { IApiKeyRepository, IAuditLogRepository } from '../../domain/repositories';
import { CreateApiKeyDto, ApiKeyResponseDto } from '../dto';

export class ApiKeyService {
  private readonly _apiKeyRepo: IApiKeyRepository;
  private readonly _auditRepo: IAuditLogRepository;

  constructor(apiKeyRepo: IApiKeyRepository, auditRepo: IAuditLogRepository) {
    this._apiKeyRepo = apiKeyRepo;
    this._auditRepo = auditRepo;
  }

  public async createApiKey(dto: CreateApiKeyDto): Promise<ApiKeyResponseDto> {
    const rawSecret = crypto.randomBytes(24).toString('hex');
    const prefix = `syno_sk_${rawSecret.substring(0, 4)}`;
    const fullKey = `${prefix}_${rawSecret}`;
    const keyHash = crypto.createHash('sha256').update(fullKey).digest('hex');

    const expiresAt = dto.expiresInDays
      ? new Date(Date.now() + dto.expiresInDays * 24 * 60 * 60 * 1000)
      : undefined;

    const apiKey = new ApiKeyEntity(
      new ApiKeyIdentifier(),
      new UserIdentifier(dto.userId),
      dto.name,
      keyHash,
      prefix,
      dto.scopes,
      expiresAt,
      dto.tenantId,
      dto.storeId
    );

    await this._apiKeyRepo.save(apiKey);
    await this._auditRepo.save(new AuditLogEntity('API_KEY_CREATED', dto.userId, undefined, { keyName: dto.name }));

    return {
      id: apiKey.id.value,
      name: apiKey.name,
      rawKey: fullKey,
      prefix: apiKey.prefix,
      scopes: apiKey.scopes,
      expiresAt: apiKey.expiresAt,
      createdAt: apiKey.createdAt,
    };
  }

  public async getUserApiKeys(userIdStr: string): Promise<readonly ApiKeyResponseDto[]> {
    const keys = await this._apiKeyRepo.findByUserId(new UserIdentifier(userIdStr));
    return keys
      .filter((k) => k.isValid)
      .map((k) => ({
        id: k.id.value,
        name: k.name,
        prefix: k.prefix,
        scopes: k.scopes,
        expiresAt: k.expiresAt,
        createdAt: k.createdAt,
      }));
  }

  public async revokeApiKey(keyIdStr: string): Promise<void> {
    const key = await this._apiKeyRepo.findById(new ApiKeyIdentifier(keyIdStr));
    if (key) {
      key.revoke();
      await this._apiKeyRepo.save(key);
      await this._auditRepo.save(new AuditLogEntity('API_KEY_REVOKED', key.userId.value, undefined, { keyId: keyIdStr }));
    }
  }

  public async validateApiKey(rawKey: string): Promise<{ isValid: boolean; userId?: string | undefined; scopes?: readonly string[] | undefined }> {
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');
    const key = await this._apiKeyRepo.findByHash(keyHash);
    if (!key || !key.isValid) {
      return { isValid: false };
    }
    return { isValid: true, userId: key.userId.value, scopes: key.scopes };
  }
}
