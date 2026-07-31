/**
 * Enterprise Observability, Reliability & SRE Type Definitions
 * @module modules/observability/types
 */

export type MetricType = 'COUNTER' | 'GAUGE' | 'HISTOGRAM';
export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
export type IncidentSeverity = 'SEV1_CRITICAL' | 'SEV2_MAJOR' | 'SEV3_MINOR';

export interface SpanRecord {
  traceId: string;
  spanId: string;
  parentSpanId?: string | undefined;
  name: string;
  durationMs: number;
  tags: Record<string, string>;
  timestamp: Date;
}

export interface MetricPoint {
  metricName: string;
  type: MetricType;
  value: number;
  labels: Record<string, string>;
  timestamp: Date;
}

export interface LogEntryRecord {
  logId: string;
  traceId: string;
  level: LogLevel;
  message: string;
  context: Record<string, any>;
  timestamp: Date;
}

export interface IncidentRecord {
  incidentId: string;
  title: string;
  severity: IncidentSeverity;
  status: 'OPEN' | 'INVESTIGATING' | 'MITIGATED' | 'RESOLVED';
  commander: string;
  startedAt: Date;
  resolvedAt?: Date | undefined;
}
