/**
 * Prometheus Metrics Aggregation & Exporter Engine
 * @module modules/observability/metrics-collector
 */

import { MetricPoint, MetricType } from './types';

export class PrometheusMetricsEngine {
  private readonly _metrics: MetricPoint[] = [];

  public recordMetric(metricName: string, type: MetricType, value: number, labels: Record<string, string> = {}): MetricPoint {
    const point: MetricPoint = {
      metricName,
      type,
      value,
      labels,
      timestamp: new Date(),
    };

    this._metrics.push(point);
    return point;
  }

  public exportPrometheusMetricsText(): string {
    let output = '# HELP syno_requests_total Total HTTP Requests Processed\n';
    output += '# TYPE syno_requests_total counter\n';

    for (const m of this._metrics) {
      const labelStr = Object.entries(m.labels)
        .map(([k, v]) => `${k}="${v}"`)
        .join(',');
      output += `${m.metricName}{${labelStr}} ${m.value}\n`;
    }

    return output;
  }
}
