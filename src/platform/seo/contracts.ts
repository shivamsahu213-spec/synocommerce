export interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  robots?: string;
  openGraph?: Record<string, unknown>;
}

export interface SeoResolver {
  resolve(routeId: string): SeoMetadata;
}
