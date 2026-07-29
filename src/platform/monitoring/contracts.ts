export interface HealthCheckResult {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  details?: Record<string, unknown>;
}

export interface HealthCheck {
  name: string;
  run(): Promise<HealthCheckResult>;
}

export interface AuditLogRecord {
  actor: string;
  action: string;
  resource: string;
  occurredAt: string;
  metadata?: Record<string, unknown>;
}
