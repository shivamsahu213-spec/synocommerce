/**
 * Plugin Runtime Contracts
 * @module kernel/plugins/plugin-runtime.interface
 */

import { IPluginManifest } from '../manifest';
import { PluginState } from '../types';

export interface IPluginPermissions {
  readonly grantedPermissions: readonly string[];
  hasPermission(permission: string): boolean;
}

export interface IPluginSandbox {
  executeInSandbox<T>(pluginId: string, fn: () => T): T;
}

export interface IPlugin {
  readonly manifest: IPluginManifest;
  readonly state: PluginState;
  readonly permissions: IPluginPermissions;
  activate(): Promise<void>;
  deactivate(): Promise<void>;
}

export interface IPluginRegistry {
  registerPlugin(plugin: IPlugin): void;
  getPlugin(pluginId: string): IPlugin | undefined;
  getPluginsForModule(moduleName: string): readonly IPlugin[];
}
