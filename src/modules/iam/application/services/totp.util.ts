/**
 * RFC 6238 TOTP (Time-Based One-Time Password) Utility
 *
 * Implemented using Node.js built-in crypto module.
 *
 * @module modules/iam/application/services/totp.util
 */

import crypto from 'node:crypto';

export class TotpUtil {
  public static generateSecret(): string {
    return crypto.randomBytes(20).toString('hex'); // 40-char hex secret
  }

  public static generateTotp(secretHex: string, timeWindow: number = Math.floor(Date.now() / 1000 / 30)): string {
    const buffer = Buffer.alloc(8);
    buffer.writeBigInt64BE(BigInt(timeWindow));
    const hmac = crypto.createHmac('sha1', Buffer.from(secretHex, 'hex')).update(buffer).digest();
    const offset = hmac[hmac.length - 1]! & 0xf;
    const code =
      ((hmac[offset]! & 0x7f) << 24) |
      ((hmac[offset + 1]! & 0xff) << 16) |
      ((hmac[offset + 2]! & 0xff) << 8) |
      (hmac[offset + 3]! & 0xff);
    const otp = (code % 1000000).toString().padStart(6, '0');
    return otp;
  }

  public static verifyTotp(secretHex: string, token: string): boolean {
    const currentWindow = Math.floor(Date.now() / 1000 / 30);
    // Check current, previous (-1), and next (+1) windows to allow for clock drift
    for (let offset = -1; offset <= 1; offset++) {
      const generated = TotpUtil.generateTotp(secretHex, currentWindow + offset);
      if (generated === token) {
        return true;
      }
    }
    return false;
  }
}
