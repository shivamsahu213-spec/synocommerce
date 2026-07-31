/**
 * JSON Structured Logger & PII Data Masking Engine
 * @module modules/observability/structured-logger
 */

import { LogEntryRecord, LogLevel } from './types';

export class StructuredLoggerEngine {
  private readonly _logs: LogEntryRecord[] = [];

  public log(level: LogLevel, traceId: string, message: string, context: Record<string, any> = {}): LogEntryRecord {
    const maskedContext = this.maskPiiData(context);
    const entry: LogEntryRecord = {
      logId: `log_${Date.now()}`,
      traceId,
      level,
      message,
      context: maskedContext,
      timestamp: new Date(),
    };

    this._logs.push(entry);
    return entry;
  }

  public maskPiiData(obj: Record<string, any>): Record<string, any> {
    const masked: Record<string, any> = {};

    for (const [key, val] of Object.entries(obj)) {
      const k = key.toLowerCase();
      if (k.includes('password') || k.includes('token') || k.includes('secret')) {
        masked[key] = '[REDACTED_SECRET]';
      } else if (k.includes('card') || k.includes('credit')) {
        masked[key] = 'xxxx-xxxx-xxxx-4242';
      } else {
        masked[key] = val;
      }
    }

    return masked;
  }
}
