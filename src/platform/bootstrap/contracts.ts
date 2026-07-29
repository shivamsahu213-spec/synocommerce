import type { PlatformApplication } from '@platform/application';
import type { PlatformModule } from '@platform/kernel';

export type BootstrapStage = 'preflight' | 'register' | 'boot' | 'ready';

export interface BootstrapTask {
  name: string;
  stage: BootstrapStage;
  run(application: PlatformApplication): Promise<void> | void;
}

export interface BootstrapManifest {
  modules: PlatformModule[];
  tasks?: BootstrapTask[];
}

export interface PlatformBootstrapper {
  bootstrap(manifest: BootstrapManifest): Promise<PlatformApplication>;
}
