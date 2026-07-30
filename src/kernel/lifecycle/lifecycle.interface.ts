/**
 * Module Lifecycle Manager Contracts
 * @module kernel/lifecycle/lifecycle.interface
 */

export type LifecycleAction = 'INSTALL' | 'ENABLE' | 'DISABLE' | 'UPGRADE' | 'ROLLBACK' | 'UNINSTALL';

export interface ILifecycleValidationResult {
  readonly isValid: boolean;
  readonly errors: readonly string[];
}

export interface IModuleLifecycleManager {
  executeAction(moduleName: string, action: LifecycleAction, targetVersion?: string): Promise<void>;
  validateDependencies(moduleName: string): Promise<ILifecycleValidationResult>;
  validateConfiguration(moduleName: string): Promise<ILifecycleValidationResult>;
  validateHealth(moduleName: string): Promise<ILifecycleValidationResult>;
}
