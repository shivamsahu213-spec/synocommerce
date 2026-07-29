export interface MiddlewareContext {
  correlationId?: string;
  metadata?: Record<string, unknown>;
}

export type NextMiddleware = () => Promise<void>;

export type MiddlewareHandler<TContext extends MiddlewareContext = MiddlewareContext> = (
  context: TContext,
  next: NextMiddleware
) => Promise<void>;
