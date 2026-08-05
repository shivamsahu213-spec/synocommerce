/**
 * Extension Platform Lifecycle & Plugin Engine
 * @module src/modules/extensions/plugin-engine
 */

import { InstalledPluginRecord, SynoPackage } from './types';
import { PluginSigningEngine } from './plugin-signing';
import { PluginValidatorProcessor } from './plugin-validator';

export class PluginEngineProcessor {
  private installedPlugins = new Map<string, InstalledPluginRecord>();
  private signingEngine = new PluginSigningEngine();
  private validator = new PluginValidatorProcessor();

  public installPlugin(pkg: SynoPackage): InstalledPluginRecord {
    if (!this.signingEngine.verifyPackageSignature(pkg)) {
      throw new Error('INVALID_PACKAGE_SIGNATURE');
    }

    const valRes = this.validator.validateManifest(pkg.manifest);
    if (!valRes.valid) {
      throw new Error(`INVALID_MANIFEST: ${valRes.errors.join(', ')}`);
    }

    const record: InstalledPluginRecord = {
      pluginId: pkg.manifest.pluginId,
      version: pkg.manifest.version,
      state: 'ACTIVE',
      installedAt: new Date(),
      updatedAt: new Date(),
      healthStatus: 'HEALTHY',
    };

    this.installedPlugins.set(pkg.manifest.pluginId, record);
    return record;
  }

  public disablePlugin(pluginId: string): InstalledPluginRecord {
    const plugin = this.installedPlugins.get(pluginId);
    if (!plugin) throw new Error('PLUGIN_NOT_FOUND');

    plugin.state = 'DISABLED';
    plugin.updatedAt = new Date();
    return plugin;
  }

  public enablePlugin(pluginId: string): InstalledPluginRecord {
    const plugin = this.installedPlugins.get(pluginId);
    if (!plugin) throw new Error('PLUGIN_NOT_FOUND');

    plugin.state = 'ACTIVE';
    plugin.updatedAt = new Date();
    return plugin;
  }

  public updatePlugin(pkg: SynoPackage): InstalledPluginRecord {
    const existing = this.installedPlugins.get(pkg.manifest.pluginId);
    if (!existing) throw new Error('PLUGIN_NOT_FOUND');

    const updatedRecord: InstalledPluginRecord = {
      ...existing,
      previousVersion: existing.version,
      version: pkg.manifest.version,
      updatedAt: new Date(),
    };

    this.installedPlugins.set(pkg.manifest.pluginId, updatedRecord);
    return updatedRecord;
  }

  public rollbackPlugin(pluginId: string): InstalledPluginRecord {
    const plugin = this.installedPlugins.get(pluginId);
    if (!plugin || !plugin.previousVersion) throw new Error('NO_PREVIOUS_VERSION');

    plugin.version = plugin.previousVersion;
    delete plugin.previousVersion;
    plugin.updatedAt = new Date();
    return plugin;
  }

  public uninstallPlugin(pluginId: string): boolean {
    return this.installedPlugins.delete(pluginId);
  }

  public getPlugin(pluginId: string): InstalledPluginRecord | undefined {
    return this.installedPlugins.get(pluginId);
  }
}
