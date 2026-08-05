/**
 * Commerce Kernel Runtime Contracts
 *
 * Core composition engine managing modules, plugins, tenants, licensing, and diagnostics.
 *
 * @module kernel/runtime/kernel-runtime.interface
 */

import { IKernelConfigurationManager } from '../configuration';
import { IKernelDiagnostics } from '../diagnostics';
import { IFeatureManager } from '../feature-flags';
import { ILicenseManager } from '../licensing';
import { IModuleRegistry } from '../modules';
import { IPluginRegistry } from '../plugins';
import { IStoreRegistry } from '../stores';
import { ITenantRegistry } from '../tenants';

export interface ICommerceKernelRuntime {
  readonly isInitialized: boolean;
  readonly modules: IModuleRegistry;
  readonly plugins: IPluginRegistry;
  readonly tenants: ITenantRegistry;
  readonly stores: IStoreRegistry;
  readonly license: ILicenseManager;
  readonly features: IFeatureManager;
  readonly config: IKernelConfigurationManager;
  readonly diagnostics: IKernelDiagnostics;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
}
