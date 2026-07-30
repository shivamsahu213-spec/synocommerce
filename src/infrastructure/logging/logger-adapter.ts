/**
 * Infrastructure Logging & Audit Adapter
 * @module infrastructure/logging/logger-adapter
 */

export interface ILoggerAdapter {
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void;
  debug(message: string, context?: Record<string, unknown>): void;
}

export class ConsoleLoggerAdapter implements ILoggerAdapter {
  public info(message: string, context?: Record<string, unknown>): void {}
  public warn(message: string, context?: Record<string, unknown>): void {}
  public error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {}
  public debug(message: string, context?: Record<string, unknown>): void {}
}
