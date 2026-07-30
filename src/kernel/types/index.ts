/**
 * Commerce Kernel Types
 * @module kernel/types
 */

export type LicenseEdition = 'COMMUNITY' | 'PROFESSIONAL' | 'ENTERPRISE' | 'DEVELOPER' | 'TRIAL';

export type ModuleState = 'UNINSTALLED' | 'INSTALLED' | 'DISABLED' | 'ENABLED' | 'FAILED';

export type PluginState = 'DISCOVERED' | 'LOADED' | 'ACTIVE' | 'DISABLED' | 'ERROR';

export type ConfigLevel = 'GLOBAL' | 'TENANT' | 'STORE' | 'BRAND' | 'MODULE' | 'PLUGIN';
