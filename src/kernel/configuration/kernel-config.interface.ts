/**
 * Kernel Runtime Configuration Contracts
 *
 * Supports Global, Tenant, Store, Brand, Module, and Plugin config resolution with overrides.
 *
 * @module kernel/configuration/kernel-config.interface
 */

import { ConfigLevel } from '../types';

export interface ConfigResolutionContext {
  readonly tenantId?: string | undefined;
  readonly storeId?: string | undefined;
  readonly brandId?: string | undefined;
  readonly moduleName?: string | undefined;
  readonly pluginId?: string | undefined;
}

export interface IKernelConfigurationManager {
  getConfig<T>(key: string, context?: ConfigResolutionContext | undefined, defaultValue?: T | undefined): T;
  setConfig<T>(key: string, value: T, level: ConfigLevel, context?: ConfigResolutionContext | undefined): void;
}
