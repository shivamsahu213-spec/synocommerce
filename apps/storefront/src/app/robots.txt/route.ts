/**
 * Robots.txt SEO Route
 * @module apps/storefront/src/app/robots.txt/route
 */

import { NextResponse } from 'next/server';

export async function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /checkout
Disallow: /account

Sitemap: https://store.synocommerce.com/sitemap.xml`;

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
