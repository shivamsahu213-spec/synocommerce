/**
 * Enterprise API Platform & Developer Portal Type Definitions
 * @module modules/api-platform/types
 */

export type ApiScope = 'read:catalog' | 'write:orders' | 'manage:customers' | 'admin:all';

export interface ApiKeyRecord {
  keyId: string;
  apiKey: string;
  secretHash: string;
  clientId: string;
  scopes: ApiScope[];
  rateLimitReqPerMin: number;
  revoked: boolean;
  createdAt: Date;
}

export interface WebhookEndpointRecord {
  endpointId: string;
  clientId: string;
  targetUrl: string;
  secret: string;
  subscribedEvents: string[];
  active: boolean;
}

export interface WebhookDeliveryRecord {
  deliveryId: string;
  endpointId: string;
  event: string;
  payload: Record<string, any>;
  signature: string;
  statusCode: number;
  attempts: number;
  status: 'DELIVERED' | 'FAILED' | 'REPLAYED';
  timestamp: Date;
}

export interface OpenApiSpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  paths: Record<string, any>;
}

export interface SdkMetadata {
  language: 'typescript' | 'python' | 'go' | 'java';
  packageName: string;
  version: string;
  generatedAt: Date;
}
