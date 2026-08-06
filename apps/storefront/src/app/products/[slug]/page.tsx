'use client';

import { Breadcrumb } from '@storefront/components/storefront/discovery/Breadcrumb';
import { ProductGallery } from '@storefront/components/storefront/discovery/ProductGallery';
import { ProductTabs } from '@storefront/components/storefront/discovery/ProductTabs';
import { QuantitySelector } from '@storefront/components/storefront/discovery/QuantitySelector';
import { RecentlyViewed } from '@storefront/components/storefront/discovery/RecentlyViewed';
import { RelatedProducts } from '@storefront/components/storefront/discovery/RelatedProducts';
import { ReviewList } from '@storefront/components/storefront/discovery/ReviewList';
import { ReviewSummary } from '@storefront/components/storefront/discovery/ReviewSummary';
import { StickyAddToCart } from '@storefront/components/storefront/discovery/StickyAddToCart';
import { VariantSelector } from '@storefront/components/storefront/discovery/VariantSelector';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import { CheckCircle2, Heart, ShieldCheck, ShoppingBag, Star, Truck, Zap } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'bhilai-kumkumadi-saffron-oil';

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    volume: '30ml Glass Bottle',
    potency: 'Standard Formula',
  });
  const [isLiked, setIsLiked] = useState(false);
  const [cartSuccess, setCartSuccess] = useState(false);

  const productData = {
    slug,
    name: 'Bhilai Kumkumadi Saffron Glow Oil 30ml',
    category: 'Ayurvedic Skincare',
    brand: 'Kalyan Ayurvedic Reserve',
    price: 45.0,
    origPrice: 60.0,
    rating: 4.98,
    reviewsCount: 210,
    inStock: true,
    stockCount: 18,
    mainEmoji: '✨',
    galleryEmojis: ['✨', '🌿', '🍵', '🍯'],
    badgeText: 'AYUSH Certified Organic',
    description:
      'Formulated according to ancient Charaka Samhita Ayurvedic manuscripts in Bhilai. Pure Kashmiri saffron pistils micro-infused with cold-pressed sesame oil, sandalwood, and lotus extract.',
    specifications: {
      Volume: '30ml / 1.0 fl. oz.',
      'Key Ingredient': 'Kashmiri Saffron (Crocus Sativus)',
      Extraction: 'Cold-Pressed Micro-Infusion',
      Origin: 'Bhilai Bhavan • Chhattisgarh',
      ShelfLife: '24 Months',
      Certification: 'AYUSH & GMP Certified',
    },
    variants: [
      {
        type: 'volume',
        name: 'Bottle Size',
        options: ['15ml Travel', '30ml Glass Bottle', '50ml Deluxe'],
      },
      {
        type: 'potency',
        name: 'Formulation Potency',
        options: ['Standard Formula', 'Concentrated Reserve'],
      },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Priya Sharma',
        location: 'Mumbai, MH',
        rating: 5,
        date: '3 days ago',
        title: 'Miracle in a bottle for hyperpigmentation!',
        comment:
          'I have tried luxury European serums, but this Bhilai Kumkumadi oil is on another level. My skin texture smoothed out in 10 days.',
        helpfulCount: 42,
      },
      {
        id: 'r2',
        author: 'Dr. Rajesh Patel',
        location: 'Ahmedabad, GJ',
        rating: 5,
        date: '1 week ago',
        title: 'Authentic Ayurvedic preparation',
        comment:
          'As a practicing Ayurvedic physician, I verify that this formulation uses genuine cold-pressed sesame and pure saffron.',
        helpfulCount: 88,
      },
    ],
    relatedProducts: [
      {
        id: '4',
        slug: 'kalyan-triphala-juice-1l',
        name: 'Kalyan Triphala Juice 1L',
        category: 'Ayurvedic Wellness',
        brand: 'Kalyan Ayurvedic',
        price: 15.0,
        origPrice: 20.0,
        rating: 4.9,
        reviewsCount: 142,
        inStock: true,
        emoji: '🍵',
        tag: 'Best Seller',
      },
      {
        id: '5',
        slug: 'organic-ashwagandha-gold-60s',
        name: 'Organic Ashwagandha Gold 60s',
        category: 'Ayurvedic Wellness',
        brand: 'Kalyan Ayurvedic',
        price: 18.0,
        origPrice: 24.0,
        rating: 4.88,
        reviewsCount: 95,
        inStock: true,
        emoji: '🌿',
        tag: 'Stress Relief',
      },
    ],
    recentlyViewed: [
      {
        id: '2',
        slug: 'aura-studio-wireless-headphones',
        name: 'Aura Studio Wireless Headphones',
        category: 'High-Acoustic Audio',
        brand: 'Aura Acoustic',
        price: 299.0,
        rating: 4.95,
        reviewsCount: 88,
        inStock: true,
        emoji: '🎧',
        tag: 'Hi-Fi Lossless',
      },
    ],
  };

  const handleSelectVariant = (type: string, val: string) => {
    setSelectedVariants((prev) => ({ ...prev, [type]: val }));
  };

  const handleAddToCart = () => {
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        <Breadcrumb
          items={[
            { label: 'Catalog Discovery', href: '/products' },
            { label: productData.category, href: '/products' },
            { label: productData.name },
          ]}
        />

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Gallery & Zoom */}
          <div className="lg:col-span-6">
            <ProductGallery
              mainEmoji={productData.mainEmoji}
              galleryEmojis={productData.galleryEmojis}
              badgeText={productData.badgeText}
            />
          </div>

          {/* Right Column: Buying Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                <span>{productData.brand}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  In Stock ({productData.stockCount} units)
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                {productData.name}
              </h1>

              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{productData.rating}</span>
                  <span className="text-slate-400">({productData.reviewsCount} verified reviews)</span>
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Single Unit Price</span>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl font-bold text-emerald-400">
                    ${productData.price.toFixed(2)}
                  </span>
                  {productData.origPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      ${productData.origPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
                    Save 25%
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-amber-400 text-amber-400' : ''}`} />
              </button>
            </div>

            {/* Variant Selector */}
            <VariantSelector
              variants={productData.variants}
              selectedVariants={selectedVariants}
              onSelectVariant={handleSelectVariant}
            />

            {/* Quantity Selector */}
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

            {/* Notification alert on Add */}
            {cartSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Added {quantity} unit(s) to your shopping bag!</span>
              </div>
            )}

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 py-4 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full sm:flex-1 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Buy Now • Instant Checkout</span>
              </button>
            </div>

            {/* Delivery & Trust Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-indigo-400" />
                <span>Free Express Delivery (2-3 Days)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Product Specifications Tabs */}
        <ProductTabs description={productData.description} specifications={productData.specifications} />

        {/* Reviews Section */}
        <div className="space-y-8">
          <ReviewSummary avgRating={productData.rating} totalReviews={productData.reviewsCount} />
          <ReviewList reviews={productData.reviews} />
        </div>

        {/* Related Products Cross-Sells */}
        <RelatedProducts products={productData.relatedProducts} />

        {/* Recently Viewed Bar */}
        <RecentlyViewed products={productData.recentlyViewed} />
      </main>

      {/* Floating Sticky Add To Cart Bar */}
      <StickyAddToCart
        productName={productData.name}
        price={productData.price}
        onAddToCart={handleAddToCart}
        onBuyNow={handleAddToCart}
      />

      <Footer />
    </div>
  );
}
