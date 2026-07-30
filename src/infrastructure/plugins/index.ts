/**
 * Infrastructure Plugin Loader
 * @module infrastructure/plugins
 */

export interface IInfrastructurePlugin {
  readonly pluginName: string;
  initialize(): Promise<void>;
}

export class InfrastructurePluginRegistry {
  private readonly _plugins: IInfrastructurePlugin[] = [];

  public register(plugin: IInfrastructurePlugin): void {
    this._plugins.push(plugin);
  }

  public async initializeAll(): Promise<void> {
    for (const plugin of this._plugins) {
      await plugin.initialize();
    }
  }
}
