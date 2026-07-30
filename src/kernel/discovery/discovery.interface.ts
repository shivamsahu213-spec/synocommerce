/**
 * Runtime Discovery Contracts
 * @module kernel/discovery/discovery.interface
 */

import { IModuleManifest, IPluginManifest } from '../manifest';

export interface IModuleDiscoveryService {
  discoverModules(): Promise<readonly IModuleManifest[]>;
}

export interface IPluginDiscoveryService {
  discoverPlugins(): Promise<readonly IPluginManifest[]>;
}
