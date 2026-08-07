// src/database/sorting.ts
/**
 * Utility to parse a sorting string like "name asc,price desc" into Prisma orderBy format.
 */
import { SortDirection } from '../common/enums';

export type OrderBy = Record<string, 'asc' | 'desc'>;

/**
 * Convert a raw sort string into an array of Prisma orderBy objects.
 * Supports dot notation for nested fields (e.g., "category.name asc").
 */
export function parseSort(input: string): OrderBy[] {
  if (!input) return [];
  return input
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((segment) => {
      const parts = segment.split(/\s+/);
      const field = parts[0] as string;
      const dir = parts[1];
      const direction = (dir ?? 'asc').toLowerCase() as SortDirection;
      return { [field]: direction };
    });
}

/**
 * Helper to merge multiple orderBy objects – later entries have lower priority.
 */
export function mergeOrderBy(...orderBys: OrderBy[]): OrderBy[] {
  const merged: OrderBy[] = [];
  for (const ob of orderBys) {
    merged.push(...Object.entries(ob).map(([field, direction]) => ({ [field]: direction })));
  }
  return merged;
}
