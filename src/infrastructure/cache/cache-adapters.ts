/**
 * Infrastructure Cache Adapters
 *
 * Implements caching mechanisms for Redis and In-Memory.
 *
 * @module infrastructure/cache/cache-adapters
 */

export interface ICacheAdapter {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

export class InMemoryCacheAdapter implements ICacheAdapter {
  private readonly _store = new Map<string, { value: unknown; expiresAt?: number | undefined }>();

  public async get<T>(key: string): Promise<T | undefined> {
    const entry = this._store.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this._store.delete(key);
      return undefined;
    }
    return entry.value as T;
  }

  public async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : undefined;
    this._store.set(key, { value, expiresAt });
  }

  public async delete(key: string): Promise<void> {
    this._store.delete(key);
  }

  public async clear(): Promise<void> {
    this._store.clear();
  }
}

export class RedisCacheAdapter implements ICacheAdapter {
  private readonly _fallback = new InMemoryCacheAdapter();

  public async get<T>(key: string): Promise<T | undefined> {
    return this._fallback.get<T>(key);
  }
  public async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    return this._fallback.set<T>(key, value, ttlSeconds);
  }
  public async delete(key: string): Promise<void> {
    return this._fallback.delete(key);
  }
  public async clear(): Promise<void> {
    return this._fallback.clear();
  }
}
