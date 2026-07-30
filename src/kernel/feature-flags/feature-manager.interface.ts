/**
 * Kernel Feature Management Contracts
 * @module kernel/feature-flags/feature-manager.interface
 */

export interface ExperimentConfig {
  readonly experimentId: string;
  readonly variant: string;
  readonly isEnabled: boolean;
}

export interface RolloutConfig {
  readonly featureKey: string;
  readonly percentage: number;
}

export interface IFeatureManager {
  isFeatureEnabled(featureKey: string, tenantId?: string, storeId?: string): boolean;
  getExperiment(experimentId: string, userId?: string): ExperimentConfig;
}
