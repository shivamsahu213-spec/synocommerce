/**
 * Enterprise APM, Monitoring & Incident Management Types
 * @module src/integrations/monitoring/types
 */

export type MonitoringProviderType =
  | 'PROMETHEUS'
  | 'GRAFANA'
  | 'CLOUDWATCH'
  | 'DATADOG'
  | 'NEW_RELIC'
  | 'ELASTIC_APM'
  | 'SENTRY'
  | 'OPENTELEMETRY';

export type AlertChannelType = 'SLACK' | 'EMAIL' | 'DISCORD' | 'PAGERDUTY' | 'OPSGENIE' | 'WEBHOOK' | 'SMS';
export type IncidentSeverity = 'SEV1_CRITICAL' | 'SEV2_HIGH' | 'SEV3_MEDIUM' | 'SEV4_LOW';
export type IncidentStatus = 'OPEN' | 'ACKNOWLEDGED' | 'RESOLVED';

export type HealthComponentType =
  | 'DATABASE'
  | 'REDIS'
  | 'STORAGE'
  | 'PAYMENTS'
  | 'SEARCH'
  | 'EMAIL'
  | 'SMS'
  | 'CDN'
  | 'QUEUE'
  | 'WORKERS';

export interface HealthCheckResult {
  component: HealthComponentType;
  status: 'HEALTHY' | 'DEGRADED' | 'DOWN';
  latencyMs: number;
  message?: string | undefined;
  timestamp: Date;
}

export interface MetricPoint {
  metricName: string;
  value: number;
  unit: string;
  labels?: Record<string, string> | undefined;
  timestamp: Date;
}

export interface AlertPayload {
  alertId: string;
  title: string;
  severity: IncidentSeverity;
  source: string;
  channels: AlertChannelType[];
  message: string;
  timestamp: Date;
}

export interface IncidentRecord {
  incidentId: string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  affectedComponents: HealthComponentType[];
  createdTime: Date;
  acknowledgedTime?: Date | undefined;
  resolvedTime?: Date | undefined;
  rootCause?: string | undefined;
  timeline: { time: Date; note: string }[];
}

export interface UptimeSlaMetrics {
  totalRequests: number;
  successfulRequests: number;
  availabilityPercentage: number;
  p95LatencyMs: number;
  p99LatencyMs: number;
  sloTargetPercentage: number;
  isSloMet: boolean;
}
