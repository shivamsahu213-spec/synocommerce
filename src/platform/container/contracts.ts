export type ServiceToken<TValue = unknown> = string | symbol | { new (...args: never[]): TValue };
export type ServiceLifetime = 'singleton' | 'transient' | 'scoped';

export interface ServiceRegistration<TValue = unknown> {
  token: ServiceToken<TValue>;
  lifetime: ServiceLifetime;
  factory: (container: ServiceResolver) => TValue | Promise<TValue>;
  lazy?: boolean;
  onResolved?: (value: TValue) => Promise<void> | void;
  onDispose?: (value: TValue) => Promise<void> | void;
}

export interface ServiceResolver {
  resolve<TValue>(token: ServiceToken<TValue>): Promise<TValue>;
  tryResolve<TValue>(token: ServiceToken<TValue>): Promise<TValue | null>;
}

export interface ServiceScope extends ServiceResolver {
  dispose(): Promise<void>;
}

export interface ServiceContainer extends ServiceResolver {
  register<TValue>(registration: ServiceRegistration<TValue>): void;
  registerFactory<TValue>(token: ServiceToken<TValue>, factory: ServiceRegistration<TValue>['factory']): void;
  has(token: ServiceToken): boolean;
  createScope(): ServiceScope;
  registerModule(moduleName: string, registrations: ServiceRegistration[]): void;
  onBoot(callback: () => Promise<void> | void): void;
  onShutdown(callback: () => Promise<void> | void): void;
}
