/**
 * Commerce Module Contracts
 * @module kernel/modules/module.interface
 */

import { IModuleManifest } from '../manifest';
import { ModuleState } from '../types';

export interface IModuleLifecycleHooks {
  onInstall?(): Promise<void>;
  onEnable?(): Promise<void>;
  onDisable?(): Promise<void>;
  onUpgrade?(fromVersion: string): Promise<void>;
  onRollback?(toVersion: string): Promise<void>;
  onUninstall?(): Promise<void>;
}

export interface ICommerceModule {
  readonly manifest: IModuleManifest;
  readonly state: ModuleState;
  readonly hooks?: IModuleLifecycleHooks | undefined;
  checkHealth(): Promise<{ isHealthy: boolean; details?: Record<string, unknown> | undefined }>;
}

export interface IModuleRegistry {
  registerModule(module: ICommerceModule): void;
  getModule(moduleName: string): ICommerceModule | undefined;
  getAllModules(): readonly ICommerceModule[];
}
