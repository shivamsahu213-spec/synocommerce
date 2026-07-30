/**
 * Versioning, Migration & Compatibility Contracts
 * @module kernel/versioning
 */

export interface VersionRange {
  readonly minVersion: string;
  readonly maxVersion?: string | undefined;
}

export interface IVersionComparator {
  satisfies(version: string, range: string): boolean;
  compare(v1: string, v2: string): -1 | 0 | 1;
}

export interface IMigrationStep {
  readonly version: string;
  up(): Promise<void>;
  down(): Promise<void>;
}

export interface ICompatibilityMatrix {
  isCompatible(moduleName: string, version: string, targetKernelVersion: string): boolean;
}
