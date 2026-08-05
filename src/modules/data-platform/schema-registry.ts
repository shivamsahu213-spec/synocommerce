/**
 * Schema Registry & Compatibility Engine
 * @module src/modules/data-platform/schema-registry
 */

import { SchemaDefinition } from './types';

export class SchemaRegistryProcessor {
  private schemas = new Map<string, SchemaDefinition>();

  public registerSchema(schema: SchemaDefinition): SchemaDefinition {
    this.schemas.set(`${schema.name}_v${schema.version}`, schema);
    return schema;
  }

  public validatePayload(name: string, version: string, payload: Record<string, any>): { valid: boolean; errors: string[] } {
    const schema = this.schemas.get(`${name}_v${version}`);
    if (!schema) return { valid: false, errors: [`SCHEMA_NOT_FOUND: ${name}_v${version}`] };

    const errors: string[] = [];
    for (const field of schema.fields) {
      if (field.required && (payload[field.name] === undefined || payload[field.name] === null)) {
        errors.push(`Missing required field: ${field.name}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  public isBackwardCompatible(oldSchema: SchemaDefinition, newSchema: SchemaDefinition): boolean {
    // New schema must not remove required fields from old schema
    for (const oldField of oldSchema.fields) {
      if (oldField.required) {
        const newField = newSchema.fields.find((f) => f.name === oldField.name);
        if (!newField) return false;
      }
    }
    return true;
  }
}
