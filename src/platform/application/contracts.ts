import type { ConfigurationRepository } from '@platform/configuration';
import type { ServiceContainer } from '@platform/container';
import type { EventBus } from '@platform/event-bus';
import type { PlatformKernel } from '@platform/kernel';

export interface ApplicationContext {
  appName: string;
  environment: string;
  brandCode: string;
  locale: string;
  currency: string;
}

export interface PlatformApplication {
  context: ApplicationContext;
  config: ConfigurationRepository;
  container: ServiceContainer;
  events: EventBus;
  kernel: PlatformKernel;
  start(): Promise<void>;
  stop(): Promise<void>;
}
