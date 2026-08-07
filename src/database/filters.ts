// src/database/filters.ts
/**
 * Utility to construct Prisma `where` objects from a generic filter definition.
 * Supports logical operators AND, OR, NOT, relation filters, JSON contains,
 * range filters for dates and numbers, and full‑text search placeholder.
 */
import { Prisma } from '@prisma/client';

export type Primitive = string | number | boolean | Date;

export interface FilterCondition {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith' | 'in' | 'notIn' | 'jsonContains' | 'fullText';
  value: Primitive | Primitive[];
}

export interface FilterGroup {
  AND?: FilterGroup[] | FilterCondition[];
  OR?: FilterGroup[] | FilterCondition[];
  NOT?: FilterGroup[] | FilterCondition[];
  // direct conditions without logical wrapper
  conditions?: FilterCondition[];
}

/**
 * Recursively translate a `FilterGroup` into a Prisma `where` clause.
 */
export function buildWhere(filter?: FilterGroup): Prisma.Sql | any {
  if (!filter) return undefined;

  const clauses: any[] = [];

  // Simple conditions
  if (filter.conditions) {
    for (const cond of filter.conditions) {
      const { field, operator, value } = cond;
      const clause = mapCondition(field, operator, value);
      clauses.push(clause);
    }
  }

  // Logical operators
  const logicalKeys: (keyof FilterGroup)[] = ['AND', 'OR', 'NOT'];
  for (const key of logicalKeys) {
    const entry = filter[key];
    if (entry && Array.isArray(entry) && entry.length) {
      const subClauses = entry.map((sub) =>
        // sub can be a FilterGroup or FilterCondition (we treat condition as group with conditions)
        'conditions' in sub ? buildWhere({ conditions: (sub as any).conditions }) : buildWhere(sub as FilterGroup),
      );
      clauses.push({ [key]: subClauses.filter(Boolean) });
    }
  }

  if (clauses.length === 1) return clauses[0];
  if (clauses.length > 1) return { AND: clauses };
  return undefined;
}

function mapCondition(field: string, operator: FilterCondition['operator'], value: any): any {
  switch (operator) {
    case 'eq':
      return { [field]: { equals: value } };
    case 'neq':
      return { [field]: { not: value } };
    case 'gt':
      return { [field]: { gt: value } };
    case 'gte':
      return { [field]: { gte: value } };
    case 'lt':
      return { [field]: { lt: value } };
    case 'lte':
      return { [field]: { lte: value } };
    case 'contains':
      return { [field]: { contains: value } };
    case 'startsWith':
      return { [field]: { startsWith: value } };
    case 'endsWith':
      return { [field]: { endsWith: value } };
    case 'in':
      return { [field]: { in: Array.isArray(value) ? value : [value] } };
    case 'notIn':
      return { [field]: { notIn: Array.isArray(value) ? value : [value] } };
    case 'jsonContains':
      return { [field]: { json: { contains: value } } };
    case 'fullText':
      // Placeholder – actual full‑text implementation depends on DB extensions
      return { [field]: { search: value } };
    default:
      return {};
  }
}
