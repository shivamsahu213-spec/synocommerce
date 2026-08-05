/**
 * Metrics Aggregator & OpenTelemetry / Prometheus Exporter Engine
 * @module src/integrations/monitoring/metrics-exporter
 */

import { MetricPoint, MonitoringProviderType } from './types';

export class MetricsExporterEngine {
  private metricsBuffer: MetricPoint[] = [];

  public recordMetric(name: string, value: number, unit: string, labels?: Record<string, string>): void {
    this.metricsBuffer.push({
      metricName: name,
      value,
      unit,
      labels,
      timestamp: new Date(),
    });
  }

  public exportPrometheusFormat(): string {
    return this.metricsBuffer
      .map((m) => {
        const labelsStr = m.labels
          ? `{${Object.entries(m.labels).map(([k, v]) => `${k}="${v}"`).join(',')}}`
          : '';
        return `syno_${m.metricName}${labelsStr} ${m.value}`;
      })
      .join('\n');
  }

  public async exportToProvider(provider: MonitoringProviderType): Promise<{ exportedCount: number; provider: string }> {
    const count = this.metricsBuffer.length;
    return {
      exportedCount: count,
      provider,
    };
  }
}
