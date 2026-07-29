import type { ServiceProvider } from '@platform/providers';

export type LifecycleStage = 'register' | 'boot' | 'ready' | 'shutdown';

export interface LifecycleContext {
  environment: string;
  brandCode: string;
  locale: string;
}

export interface PlatformModuleManifest {
  name: string;
  version: string;
  description: string;
  dependsOn?: string[];
  optional?: boolean;
}

export interface PlatformModule {
  manifest: PlatformModuleManifest;
  providers?: ServiceProvider[];
  register?(): Promise<void> | void;
  boot?(context: LifecycleContext): Promise<void> | void;
  shutdown?(context: LifecycleContext): Promise<void> | void;
}

export interface PlatformKernel {
  modules: PlatformModule[];
  registerModule(module: PlatformModule): void;
  boot(context: LifecycleContext): Promise<void>;
  shutdown(context: LifecycleContext): Promise<void>;
}
