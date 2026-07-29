export interface RouteDefinition {
  id: string;
  pathname: string;
  localized?: boolean;
  protected?: boolean;
  runtime?: 'nodejs' | 'edge';
  metadata?: Record<string, unknown>;
}

export interface RouteRegistry {
  register(route: RouteDefinition): void;
  list(): RouteDefinition[];
}
