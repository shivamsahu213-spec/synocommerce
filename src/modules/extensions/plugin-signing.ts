/**
 * Plugin Digital Signature & SHA-256 Package Signing Engine
 * @module src/modules/extensions/plugin-signing
 */

import crypto from 'node:crypto';
import { SynoPackage } from './types';

export class PluginSigningEngine {
  private secretKey = 'synocommerce_marketplace_signing_secret';

  public generateChecksum(distCode: string): string {
    return crypto.createHash('sha256').update(distCode).digest('hex');
  }

  public signPackage(distCode: string, publisherId: string): string {
    const checksum = this.generateChecksum(distCode);
    return crypto
      .createHmac('sha256', this.secretKey)
      .update(`${publisherId}:${checksum}`)
      .digest('hex');
  }

  public verifyPackageSignature(pkg: SynoPackage): boolean {
    const expectedChecksum = this.generateChecksum(pkg.distCode);
    if (expectedChecksum !== pkg.checksumSha256) {
      return false;
    }

    const expectedSig = this.signPackage(pkg.distCode, pkg.manifest.publisher);
    return expectedSig === pkg.signatureSig;
  }
}
