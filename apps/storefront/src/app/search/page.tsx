/**
 * Storefront Search Page
 * @module apps/storefront/src/app/search/page
 */

import { SearchPageView } from '../../features/search/SearchPageView';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <SearchPageView query={q || ''} />;
}
