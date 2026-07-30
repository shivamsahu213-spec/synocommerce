/**
 * Delivery Layer Core Contracts
 *
 * Framework-agnostic delivery context and request/response wrappers.
 *
 * @module delivery/contracts/delivery-context
 */

export interface IDeliveryContext {
  readonly correlationId: string;
  readonly tenantId?: string | undefined;
  readonly userId?: string | undefined;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
  readonly locale: string;
  readonly currency: string;
  readonly apiVersion: string;
  readonly clientIp?: string | undefined;
  readonly userAgent?: string | undefined;
}

export interface DeliveryRequest<TBody = unknown, TParams = Record<string, string>, TQuery = Record<string, unknown>> {
  readonly body: TBody;
  readonly params: TParams;
  readonly query: TQuery;
  readonly headers: Record<string, string>;
  readonly context: IDeliveryContext;
}

export interface DeliveryResponse<TData = unknown> {
  readonly statusCode: number;
  readonly headers: Record<string, string>;
  readonly data?: TData | undefined;
  readonly error?: unknown | undefined;
}
