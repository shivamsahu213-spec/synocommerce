import type { ServiceContainer } from '@platform/container';
import type { LifecycleContext } from '@platform/kernel';

export interface ServiceProvider {
  name: string;
  register(container: ServiceContainer): Promise<void> | void;
  boot?(container: ServiceContainer, context: LifecycleContext): Promise<void> | void;
}

export interface ProviderRegistry {
  register(provider: ServiceProvider): void;
  list(): ServiceProvider[];
}
