export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogRecord {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp?: string;
}

export interface Logger {
  log(record: LogRecord): void;
  child(context: Record<string, unknown>): Logger;
}
