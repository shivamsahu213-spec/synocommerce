/**
 * SynoCommerce Plugin SDK
 * @module tools/sdk/plugin-sdk
 */

export interface ISynoPluginManifest {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly author: string;
  readonly description: string;
  readonly permissions: readonly string[];
}

export interface ISynoPlugin {
  readonly manifest: ISynoPluginManifest;
  onEnable(): Promise<void>;
  onDisable(): Promise<void>;
}

export abstract class BaseSynoPlugin implements ISynoPlugin {
  abstract readonly manifest: ISynoPluginManifest;

  public async onEnable(): Promise<void> {
    console.log(`Plugin '${this.manifest.name}' enabled.`);
  }

  public async onDisable(): Promise<void> {
    console.log(`Plugin '${this.manifest.name}' disabled.`);
  }
}
