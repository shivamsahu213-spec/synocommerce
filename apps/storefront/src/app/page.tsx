'use client';

import { BrandCarousel } from '@storefront/components/storefront/BrandCarousel';
import { CategoryGrid } from '@storefront/components/storefront/CategoryGrid';
import { CollectionCarousel } from '@storefront/components/storefront/CollectionCarousel';
import { FeaturedProducts } from '@storefront/components/storefront/FeaturedProducts';
import { Footer } from '@storefront/components/storefront/Footer';
import { Header } from '@storefront/components/storefront/Header';
import { HeroBanner } from '@storefront/components/storefront/HeroBanner';
import { Newsletter } from '@storefront/components/storefront/Newsletter';
import { PromoBanner } from '@storefront/components/storefront/PromoBanner';
import { TopAnnouncement } from '@storefront/components/storefront/TopAnnouncement';
import { Instagram, Quote, Star } from 'lucide-react';
import React from 'react';

export default function StorefrontHomePage() {
  const testimonials = [
    {
      quote:
        'The Bhilai Kumkumadi Saffron Oil is pure perfection. My skin transformed within two weeks. Authentic Ayurvedic quality.',
      author: 'Ananya Sharma',
      title: 'Verified Buyer • Mumbai',
      rating: 5,
    },
    {
      quote:
        'The acoustic clarity on the Aura Studio Wireless Headphones rivals top German audiophile gear. Exceeded expectations.',
      author: 'Vikramaditya Roy',
      title: 'Audio Engineer • Bengaluru',
      rating: 5,
    },
    {
      quote:
        'Fastest delivery across India. Handloom silk saree arrived in exquisite custom gift box. 10/10 luxury experience.',
      author: 'Meera Deshmukh',
      title: 'VIP Collector • New Delhi',
      rating: 5,
    },
  ];

  const instagramPosts = [
    { tag: '#AyurvedicGlow', emoji: '✨', likes: '1.4k' },
    { tag: '#LosslessAudio', emoji: '🎧', likes: '2.8k' },
    { tag: '#BhilaiHeritage', emoji: '🌿', likes: '950' },
    { tag: '#HandloomSilk', emoji: '👘', likes: '3.1k' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Top Announcement */}
      <TopAnnouncement />

      {/* 2. Luxury Header & Mega Navigation */}
      <Header />

      {/* 3. Hero Banner Slider */}
      <HeroBanner />

      {/* 4. Shop By Category */}
      <CategoryGrid />

      {/* 5. 24-Hour Flash Sale Promo Banner */}
      <PromoBanner />

      {/* 6. Featured Collections Carousel */}
      <CollectionCarousel />

      {/* 7. Trending Products, Best Sellers & New Arrivals */}
      <FeaturedProducts />

      {/* 8. Brand Logos Marquee */}
      <BrandCarousel />

      {/* 9. Testimonials Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">Client Reviews</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">Loved By Discriminating Collectors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl relative space-y-4 flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-indigo-500/30" />
              <p className="text-sm text-slate-300 font-light leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-white">{t.author}</h4>
                  <span className="text-xs text-slate-400">{t.title}</span>
                </div>
                <div className="flex text-amber-400 text-xs">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Instagram Feed */}
      <section className="py-16 bg-slate-900/50 border-t border-slate-800 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 block mb-1">
                @SynoCommerce.Official
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">Follow On Instagram</h3>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 mt-3 sm:mt-0"
            >
              <Instagram className="w-4 h-4" />
              <span>Join Community</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {instagramPosts.map((post, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden aspect-square flex flex-col items-center justify-center text-4xl hover:border-indigo-500/50 transition-all cursor-pointer"
              >
                <span className="group-hover:scale-125 transition-transform duration-300">{post.emoji}</span>
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-xs font-bold text-white">{post.tag}</span>
                  <span className="text-[11px] text-amber-400 mt-1">❤️ {post.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. VIP Newsletter Signup */}
      <Newsletter />

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
