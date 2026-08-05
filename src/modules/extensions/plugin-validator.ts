/**
 * Plugin Manifest & Static Analysis Validator
 * @module src/modules/extensions/plugin-validator
 */

import { PluginManifest } from './types';

export class PluginValidatorProcessor {
  public validateManifest(manifest: PluginManifest): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!manifest.pluginId) errors.push('Missing pluginId');
    if (!manifest.name) errors.push('Missing plugin name');
    if (!manifest.version) errors.push('Missing plugin version');
    if (!manifest.publisher) errors.push('Missing publisher');
    if (!manifest.minPlatformVersion) errors.push('Missing minPlatformVersion');

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  public isCompatible(manifest: PluginManifest, currentPlatformVersion: string): boolean {
    // Simple semver major version compatibility check
    const manifestMajor = parseInt(manifest.minPlatformVersion.split('.')[0] || '1', 10);
    const currentMajor = parseInt(currentPlatformVersion.split('.')[0] || '1', 10);
    return manifestMajor <= currentMajor;
  }
}
