/**
 * Search Center Application Types
 * @module apps/search-center/src/types
 */

export type SearchCenterTab = 'SEARCH_TESTER' | 'INDEX_MANAGER' | 'MERCHANDISING_RULES' | 'ZERO_RESULTS' | 'ANALYTICS';

export interface SearchTesterState {
  rawQuery: string;
  selectedCategory?: string | undefined;
  typoToleranceEnabled: boolean;
}
