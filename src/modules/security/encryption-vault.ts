/**
 * AES-256-GCM Envelope Encryption & Secret Vault Engine
 * @module modules/security/encryption-vault
 */

import crypto from 'node:crypto';
import { EncryptedDataEnvelope } from './types';

export class EncryptionVaultEngine {
  private readonly _masterKey = crypto.randomBytes(32); // 256-bit AES Master Key
  private readonly _secrets = new Map<string, string>();

  public encryptField(plaintext: string, keyVersion = 1): EncryptedDataEnvelope {
    const iv = crypto.randomBytes(12); // 96-bit IV for AES-GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', this._masterKey, iv);

    let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
    ciphertext += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return {
      ciphertext,
      iv: iv.toString('hex'),
      authTag,
      keyVersion,
    };
  }

  public decryptField(envelope: EncryptedDataEnvelope): string {
    const decipher = crypto.createDecipheriv('aes-256-gcm', this._masterKey, Buffer.from(envelope.iv, 'hex'));
    decipher.setAuthTag(Buffer.from(envelope.authTag, 'hex'));

    let plaintext = decipher.update(envelope.ciphertext, 'hex', 'utf8');
    plaintext += decipher.final('utf8');

    return plaintext;
  }

  public setVaultSecret(secretName: string, secretValue: string): void {
    this._secrets.set(secretName, secretValue);
  }

  public getVaultSecret(secretName: string): string {
    const secret = this._secrets.get(secretName);
    if (!secret) {
      throw new Error(`Vault Secret '${secretName}' not found`);
    }
    return secret;
  }
}
