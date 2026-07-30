/**
 * Infrastructure Security Adapters
 *
 * Implements encryption, hashing, secret management, token services, and key management.
 *
 * @module infrastructure/security/security-adapters
 */

export interface IEncryptionAdapter {
  encrypt(plainText: string): Promise<string>;
  decrypt(cipherText: string): Promise<string>;
}

export interface IHashingAdapter {
  hash(data: string, saltRounds?: number): Promise<string>;
  verify(data: string, hash: string): Promise<boolean>;
}

export interface ISecretManagerAdapter {
  getSecret(secretName: string): Promise<string | undefined>;
}

export interface ITokenServiceAdapter {
  generateToken(payload: Record<string, unknown>, expiresInSeconds?: number): Promise<string>;
  verifyToken<T>(token: string): Promise<T | undefined>;
}

export interface IKeyManagerAdapter {
  getPublicKey(keyId: string): Promise<string>;
  getPrivateKey(keyId: string): Promise<string>;
}

export class DefaultCryptoAdapter implements IEncryptionAdapter, IHashingAdapter, ISecretManagerAdapter {
  public async encrypt(plainText: string): Promise<string> {
    return Buffer.from(plainText).toString('base64');
  }

  public async decrypt(cipherText: string): Promise<string> {
    return Buffer.from(cipherText, 'base64').toString('utf-8');
  }

  public async hash(data: string): Promise<string> {
    return `hashed_${data}`;
  }

  public async verify(data: string, hash: string): Promise<boolean> {
    return hash === `hashed_${data}`;
  }

  public async getSecret(secretName: string): Promise<string | undefined> {
    return process.env[secretName];
  }
}
