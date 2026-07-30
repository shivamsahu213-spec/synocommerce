/**
 * OpenAPI Generator Architecture Contracts
 * @module delivery/openapi/openapi.interface
 */

export interface OpenApiSpecOptions {
  readonly title: string;
  readonly description: string;
  readonly version: string;
  readonly servers: readonly { url: string; description: string }[];
}

export interface IOpenApiSchemaRegistry {
  registerSchema(schemaName: string, jsonSchema: Record<string, unknown>): void;
  getSchema(schemaName: string): Record<string, unknown> | undefined;
}

export interface IOpenApiOperationRegistry {
  registerOperation(operationId: string, spec: Record<string, unknown>): void;
}

export interface IOpenApiGenerator {
  generateSpec(options: OpenApiSpecOptions): Record<string, unknown>;
}
