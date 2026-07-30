/**
 * Commerce Kernel Error Hierarchy
 * @module kernel/errors/kernel-error
 */

export abstract class KernelError extends Error {
  public readonly timestamp: Date;

  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
  }
}

export class ModuleDependencyError extends KernelError {
  constructor(moduleName: string, missingDependency: string) {
    super('MODULE_DEPENDENCY_MISSING', `Module '${moduleName}' requires missing dependency '${missingDependency}'`);
  }
}

export class PluginSandboxError extends KernelError {
  constructor(pluginName: string, violation: string) {
    super('PLUGIN_SANDBOX_VIOLATION', `Plugin '${pluginName}' violated sandbox security: ${violation}`);
  }
}

export class LicenseViolationError extends KernelError {
  constructor(featureName: string, requiredEdition: string) {
    super('LICENSE_VIOLATION', `Feature '${featureName}' requires edition '${requiredEdition}'`);
  }
}

export class CircularDependencyError extends KernelError {
  constructor(cycle: readonly string[]) {
    super('CIRCULAR_DEPENDENCY', `Circular dependency detected: ${cycle.join(' -> ')}`);
  }
}

export class TenantNotFoundError extends KernelError {
  constructor(tenantId: string) {
    super('TENANT_NOT_FOUND', `Tenant '${tenantId}' was not found`);
  }
}

export class FeatureDisabledError extends KernelError {
  constructor(featureKey: string) {
    super('FEATURE_DISABLED', `Feature '${featureKey}' is disabled`);
  }
}
