/**
 * Search Security, Query Validation & Sanitization Engine
 * @module src/integrations/search/search-security
 */

export class SearchSecurityEngine {
  private static readonly DISALLOWED_PATTERNS = [
    /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
    /javascript:/gi,
    /UNION\s+SELECT/gi,
    /DROP\s+TABLE/gi,
  ];

  public static sanitizeQuery(query: string): string {
    let sanitized = query.trim();
    for (const pattern of SearchSecurityEngine.DISALLOWED_PATTERNS) {
      sanitized = sanitized.replace(pattern, '');
    }
    // Limit max query length to 100 characters to prevent ReDoS / memory stress
    return sanitized.substring(0, 100);
  }

  public static validateQuery(query: string): { valid: boolean; reason?: string } {
    if (!query || query.trim().length === 0) {
      return { valid: false, reason: 'QUERY_EMPTY' };
    }
    return { valid: true };
  }
}
