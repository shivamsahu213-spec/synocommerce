/**
 * XML Sitemap SEO Route
 * @module apps/storefront/src/app/sitemap.xml/route
 */

import { NextResponse } from 'next/server';
import { STOREFRONT_PRODUCTS } from '../../lib/commerce-client';

export async function GET() {
  const baseUrl = 'https://store.synocommerce.com';

  const productUrls = STOREFRONT_PRODUCTS.map(
    (p) => `<url><loc>${baseUrl}/products/${p.id}</loc><changefreq>daily</changefreq></url>`
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${baseUrl}/</loc><changefreq>always</changefreq></url>
  <url><loc>${baseUrl}/products</loc><changefreq>hourly</changefreq></url>
  ${productUrls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}
