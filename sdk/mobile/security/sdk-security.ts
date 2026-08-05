/**
 * Mobile SDK Security, Certificate Pinning & Device Trust Engine
 * @module sdk/mobile/security/sdk-security
 */

import crypto from 'node:crypto';

export class MobileSdkSecurityEngine {
  private pinnedHashes = new Set<string>();

  constructor(certificateHashes?: string[]) {
    if (certificateHashes) {
      certificateHashes.forEach((h) => this.pinnedHashes.add(h));
    }
  }

  public verifyCertificatePinning(serverCertHash: string): boolean {
    if (this.pinnedHashes.size === 0) return true; // Default fallback
    return this.pinnedHashes.has(serverCertHash);
  }

  public verifyDeviceTrust(deviceId: string, isJailbroken: boolean): { trusted: boolean; reason?: string } {
    if (isJailbroken) {
      return { trusted: false, reason: 'DEVICE_JAILBROKEN_OR_ROOTED' };
    }
    return { trusted: true };
  }

  public encryptLocalStorage(data: string, secretKey: string): string {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey.padEnd(32).slice(0, 32)), Buffer.alloc(16, 0));
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
}
