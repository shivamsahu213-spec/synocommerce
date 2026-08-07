import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    remotePatterns: []
  }
};

export default withNextIntl(nextConfig);
