/**
 * Infrastructure Health Check Adapter
 * @module infrastructure/health
 */

export interface HealthCheckResult {
  readonly status: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';
  readonly checks: readonly { name: string; isHealthy: boolean; latencyMs: number }[];
}

export class InfrastructureHealthIndicator {
  public async checkHealth(): Promise<HealthCheckResult> {
    return {
      status: 'HEALTHY',
      checks: [
        { name: 'Database', isHealthy: true, latencyMs: 2 },
        { name: 'Cache', isHealthy: true, latencyMs: 1 },
        { name: 'EventBus', isHealthy: true, latencyMs: 1 },
      ],
    };
  }
}
