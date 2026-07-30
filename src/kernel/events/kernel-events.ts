/**
 * Kernel Lifecycle Event Contracts
 * @module kernel/events/kernel-events
 */

export interface IKernelEvent {
  readonly eventId: string;
  readonly eventName: string;
  readonly timestamp: Date;
}

export class ModuleInstalledKernelEvent implements IKernelEvent {
  public readonly eventId = crypto.randomUUID();
  public readonly eventName = 'ModuleInstalled';
  public readonly timestamp = new Date();
  constructor(public readonly moduleName: string, public readonly version: string) {}
}

export class ModuleEnabledKernelEvent implements IKernelEvent {
  public readonly eventId = crypto.randomUUID();
  public readonly eventName = 'ModuleEnabled';
  public readonly timestamp = new Date();
  constructor(public readonly moduleName: string) {}
}

export class PluginLoadedKernelEvent implements IKernelEvent {
  public readonly eventId = crypto.randomUUID();
  public readonly eventName = 'PluginLoaded';
  public readonly timestamp = new Date();
  constructor(public readonly pluginId: string, public readonly targetModule: string) {}
}

export class PluginFailedKernelEvent implements IKernelEvent {
  public readonly eventId = crypto.randomUUID();
  public readonly eventName = 'PluginFailed';
  public readonly timestamp = new Date();
  constructor(public readonly pluginId: string, public readonly error: string) {}
}

export class TenantCreatedKernelEvent implements IKernelEvent {
  public readonly eventId = crypto.randomUUID();
  public readonly eventName = 'TenantCreated';
  public readonly timestamp = new Date();
  constructor(public readonly tenantId: string, public readonly name: string) {}
}

export class StoreCreatedKernelEvent implements IKernelEvent {
  public readonly eventId = crypto.randomUUID();
  public readonly eventName = 'StoreCreated';
  public readonly timestamp = new Date();
  constructor(public readonly storeId: string, public readonly tenantId: string) {}
}

export class FeatureEnabledKernelEvent implements IKernelEvent {
  public readonly eventId = crypto.randomUUID();
  public readonly eventName = 'FeatureEnabled';
  public readonly timestamp = new Date();
  constructor(public readonly featureKey: string) {}
}

export class ConfigurationChangedKernelEvent implements IKernelEvent {
  public readonly eventId = crypto.randomUUID();
  public readonly eventName = 'ConfigurationChanged';
  public readonly timestamp = new Date();
  constructor(public readonly key: string, public readonly level: string) {}
}

export class LicenseChangedKernelEvent implements IKernelEvent {
  public readonly eventId = crypto.randomUUID();
  public readonly eventName = 'LicenseChanged';
  public readonly timestamp = new Date();
  constructor(public readonly edition: string) {}
}
