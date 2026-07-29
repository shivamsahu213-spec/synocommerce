import type { ServiceProvider } from '@platform/providers';

export type PluginCapability =
  | 'analytics'
  | 'crm'
  | 'email'
  | 'erp'
  | 'marketplace'
  | 'payment'
  | 'search'
  | 'shipping'
  | 'sms'
  | 'tax';

export interface PlatformPluginManifest {
  name: string;
  version: string;
  capability: PluginCapability;
  description: string;
  enabledByDefault?: boolean;
  dependencies?: string[];
}

export interface PlatformPlugin {
  manifest: PlatformPluginManifest;
  providers?: ServiceProvider[];
  register(): Promise<void> | void;
}

export interface PluginRegistry {
  register(plugin: PlatformPlugin): void;
  listByCapability(capability: PluginCapability): PlatformPlugin[];
}
