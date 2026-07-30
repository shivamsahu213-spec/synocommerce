/**
 * Module & Plugin Manifest Contracts
 * @module kernel/manifest/manifest.interface
 */

import { LicenseEdition } from '../types';

export interface CapabilityDeclaration {
  readonly capabilityId: string;
  readonly description: string;
}

export interface DependencyDeclaration {
  readonly moduleName: string;
  readonly requiredVersion: string;
  readonly optional?: boolean | undefined;
}

export interface IModuleManifest {
  readonly moduleName: string;
  readonly version: string;
  readonly description: string;
  readonly requiredEdition: LicenseEdition;
  readonly capabilities: readonly CapabilityDeclaration[];
  readonly dependencies: readonly DependencyDeclaration[];
  readonly extensionPoints?: readonly string[] | undefined;
}

export interface IPluginManifest {
  readonly pluginId: string;
  readonly name: string;
  readonly version: string;
  readonly targetModule: string;
  readonly permissions: readonly string[];
  readonly dependencies: readonly DependencyDeclaration[];
}
