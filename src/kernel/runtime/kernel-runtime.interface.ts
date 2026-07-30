/**
 * Commerce Kernel Runtime Contracts
 *
 * Core composition engine managing modules, plugins, tenants, licensing, and diagnostics.
 *
 * @module kernel/runtime/kernel-runtime.interface
 */

import { IModuleRegistry } from '../modules';
import { IPluginRegistry } from '../plugins';
import { ITenantRegistry } from '../tenants';
import { IStoreRegistry } from '../stores';
import { ILicenseManager } from '../licensing';
import { IFeatureManager } from '../feature-flags';
import { IKernelConfigurationManager } from '../configuration';
import { IKernelDiagnostics } from '../diagnostics';

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
