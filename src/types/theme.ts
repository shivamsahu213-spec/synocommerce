export type BrandDefinition = {
  code: string;
  name: string;
  logo: {
    light: string;
    dark: string;
    favicon: string;
  };
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
  };
  socialLinks: Record<string, string>;
  analytics: {
    googleAnalyticsId: string;
    cloudflareAnalyticsToken: string;
  };
};

export type ThemeDefinition = {
  code: string;
  name: string;
  tokens: Record<string, unknown>;
  layout: Record<string, string>;
  components: Record<string, string>;
};
