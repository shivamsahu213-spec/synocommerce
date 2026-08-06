/**
 * OpenTelemetry Distributed Tracing & Span Context Engine
 * @module modules/observability/distributed-tracer
 */

import crypto from 'node:crypto';

import { SpanRecord } from './types';

export class OpenTelemetryTracerEngine {
  private readonly _spans: SpanRecord[] = [];

  public startTrace(traceName: string, tags: Record<string, string> = {}): { traceId: string; rootSpanId: string } {
    const traceId = `trc_${crypto.randomBytes(12).toString('hex')}`;
    const rootSpanId = `spn_${crypto.randomBytes(8).toString('hex')}`;

    this._spans.push({
      traceId,
      spanId: rootSpanId,
      name: traceName,
      durationMs: 15.4,
      tags: { ...tags, isRoot: 'true' },
      timestamp: new Date(),
    });

    return { traceId, rootSpanId };
  }

  public recordSpan(traceId: string, name: string, durationMs: number, parentSpanId?: string, tags: Record<string, string> = {}): SpanRecord {
    const spanId = `spn_${crypto.randomBytes(8).toString('hex')}`;
    const span: SpanRecord = {
      traceId,
      spanId,
      parentSpanId,
      name,
      durationMs,
      tags,
      timestamp: new Date(),
    };

    this._spans.push(span);
    return span;
  }

  public getTraceSpans(traceId: string): SpanRecord[] {
    return this._spans.filter((s) => s.traceId === traceId);
  }
}
