/**
 * Kernel License System Contracts
 * @module kernel/licensing/licensing.interface
 */

import { LicenseEdition } from '../types';

export interface ILicense {
  readonly licenseKey: string;
  readonly edition: LicenseEdition;
  readonly issuedTo: string;
  readonly issuedAt: Date;
  readonly expiresAt?: Date | undefined;
  readonly allowedTenantsCount: number;
  readonly allowedStoresCount: number;
  readonly isTrial: boolean;
}

export interface ILicenseManager {
  getLicense(): ILicense;
  validateEditionAccess(requiredEdition: LicenseEdition): boolean;
  validateCapabilityAccess(capabilityId: string): boolean;
}
