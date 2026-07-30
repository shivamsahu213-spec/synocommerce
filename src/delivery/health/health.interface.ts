/**
 * Delivery Health & Readiness Probe Contracts
 * @module delivery/health/health.interface
 */

export interface HealthProbeResult {
  readonly isHealthy: boolean;
  readonly component: string;
  readonly latencyMs: number;
  readonly message?: string | undefined;
}

export interface IReadinessProbe {
  checkReadiness(): Promise<{ isReady: boolean; probes: readonly HealthProbeResult[] }>;
}

export interface ILivenessProbe {
  checkLiveness(): Promise<{ isAlive: boolean }>;
}

export interface IDependencyHealthProbe {
  readonly dependencyName: string;
  check(): Promise<HealthProbeResult>;
}
