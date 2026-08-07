// src/database/utils/cursor.ts
/**
 * Encode and decode composite cursors for cursor‑based pagination.
 * Uses base64‑encoded JSON containing the primary key values that uniquely
 * identify a record. Adjust the shape if you use compound keys.
 */

export function encodeCursor(data: Record<string, unknown>): string {
  const json = JSON.stringify(data);
  return Buffer.from(json, 'utf-8').toString('base64');
}

export function decodeCursor<T = Record<string, unknown>>(cursor: string): T | null {
  try {
    const json = Buffer.from(cursor, 'base64').toString('utf-8');
    return JSON.parse(json) as T;
  } catch (e) {
    return null;
  }
}
