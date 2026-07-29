export interface CacheEntry<TValue = unknown> {
  key: string;
  value: TValue;
  ttlSeconds?: number;
  tags?: string[];
}

export interface CacheStore {
  get<TValue>(key: string): Promise<TValue | null>;
  set<TValue>(entry: CacheEntry<TValue>): Promise<void>;
  delete(key: string): Promise<void>;
  invalidateByTag(tag: string): Promise<void>;
}
