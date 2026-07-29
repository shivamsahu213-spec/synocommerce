export interface AuthSession {
  subjectId: string;
  roles: string[];
  expiresAt: string;
}

export interface Authenticator {
  authenticate(credentials: Record<string, unknown>): Promise<AuthSession | null>;
}

export interface SessionProvider {
  getSession(): Promise<AuthSession | null>;
}

export interface CsrfTokenManager {
  issue(): Promise<string>;
  verify(token: string): Promise<boolean>;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt?: string;
}

export interface RateLimiter {
  consume(key: string): Promise<RateLimitResult>;
}

export interface SecurityHeadersPolicy {
  contentSecurityPolicy?: string;
  frameOptions?: 'DENY' | 'SAMEORIGIN';
  referrerPolicy?: string;
}

export interface Encrypter {
  encrypt(value: string): Promise<string>;
  decrypt(value: string): Promise<string>;
}
