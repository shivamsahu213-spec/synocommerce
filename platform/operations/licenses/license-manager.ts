/**
 * License Management & Activation Engine
 * @module platform/operations/licenses/license-manager
 */

import crypto from 'node:crypto';

export type LicenseEdition = 'COMMUNITY' | 'PROFESSIONAL' | 'ENTERPRISE_PAAS';

export interface LicenseKeyRecord {
  readonly licenseKey: string;
  readonly tenantId: string;
  readonly edition: LicenseEdition;
  readonly issuedAt: Date;
  readonly expiresAt: Date;
  isActivated: boolean;
}

export class LicenseManagerEngine {
  private readonly _licenses = new Map<string, LicenseKeyRecord>();

  public issueLicense(tenantId: string, edition: LicenseEdition, validDays = 365): LicenseKeyRecord {
    const keyHash = crypto.createHash('sha256').update(`${tenantId}:${edition}:${Date.now()}`).digest('hex').substring(0, 32);
    const licenseKey = `SYNO-LIC-${keyHash.toUpperCase().replace(/(.{4})/g, '$1-').slice(0, -1)}`;

    const issuedAt = new Date();
    const expiresAt = new Date(issuedAt.getTime() + validDays * 24 * 60 * 60 * 1000);

    const record: LicenseKeyRecord = {
      licenseKey,
      tenantId,
      edition,
      issuedAt,
      expiresAt,
      isActivated: false,
    };

    this._licenses.set(licenseKey, record);
    return record;
  }

  public activateLicense(licenseKey: string): LicenseKeyRecord {
    const lic = this._licenses.get(licenseKey);
    if (!lic) {
      throw new Error(`Invalid license key: ${licenseKey}`);
    }

    if (new Date() > lic.expiresAt) {
      throw new Error(`License key '${licenseKey}' has expired`);
    }

    lic.isActivated = true;
    return lic;
  }
}
