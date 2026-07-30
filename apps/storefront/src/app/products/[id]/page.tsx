/**
 * Storefront Product Detail Page
 * @module apps/storefront/src/app/products/[id]/page
 */

import { ProductDetailPageView } from '../../../features/products/ProductDetailPageView';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailPageView productId={id} />;
}
