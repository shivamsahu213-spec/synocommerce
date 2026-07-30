/**
 * Infrastructure Feature Flags Adapter
 * @module infrastructure/feature-flags
 */

export interface IFeatureFlagProvider {
  isEnabled(flagKey: string, context?: Record<string, unknown>): Promise<boolean>;
}

export class LaunchDarklyFeatureFlagAdapter implements IFeatureFlagProvider {
  public async isEnabled(flagKey: string, context?: Record<string, unknown>): Promise<boolean> {
    return true;
  }
}
