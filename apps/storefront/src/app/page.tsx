import {
  AyurvedicProduct,
  KALYAN_BRAND_CONFIG,
  KALYAN_HOMEPAGE_CMS,
  KALYAN_PRODUCTS,
  KALYAN_SEO_CONFIG,
  KALYAN_STORE_CONFIG,
  ValueProp,
} from '@kalyan-ayurvedic';
import { ArrowRight,Award, CheckCircle2, Heart, Leaf, ShieldCheck, ShoppingBag, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: KALYAN_SEO_CONFIG.defaultTitle,
  description: KALYAN_SEO_CONFIG.defaultDescription,
};

export default function KalyanHomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2421] font-sans selection:bg-[#C5A059] selection:text-white">
      {/* Top Announcement Bar */}
      <div className="bg-[#0D3B2E] text-[#FDFBF7] py-2 px-4 text-center text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
        <span>Free Express Delivery Across India on Orders Above ₹999 • Direct from Bhilai Bhavan</span>
      </div>

      {/* Luxury Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FDFBF7]/90 border-b border-[#0D3B2E]/10 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0D3B2E] text-[#C5A059] flex items-center justify-center font-serif text-xl font-bold border border-[#C5A059]/30 shadow-sm">
              क
            </div>
            <div>
              <Link href="/" className="font-serif text-2xl font-bold tracking-tight text-[#0D3B2E] block">
                {KALYAN_STORE_CONFIG.name}
              </Link>
              <span className="text-[10px] tracking-widest uppercase text-[#C5A059] block font-semibold">
                Bhilai • Estd 1984
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#1A2421]">
            <Link href="/" className="hover:text-[#C5A059] transition-colors text-[#0D3B2E] font-semibold">Home</Link>
            <Link href="/products" className="hover:text-[#C5A059] transition-colors">Catalog</Link>
            <Link href="/about" className="hover:text-[#C5A059] transition-colors">Our Heritage</Link>
            <Link href="/blog" className="hover:text-[#C5A059] transition-colors">Ayurvedic Journal</Link>
            <Link href="/contact" className="hover:text-[#C5A059] transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full bg-[#0D3B2E] text-[#FDFBF7] hover:bg-[#0D3B2E]/90 transition-all flex items-center gap-2 text-xs font-semibold px-4 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
              <span>Cart (0)</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-[#0D3B2E] text-[#FDFBF7] py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#C5A059] text-xs uppercase tracking-widest font-semibold mb-6">
            <Leaf className="w-3.5 h-3.5" />
            <span>{KALYAN_HOMEPAGE_CMS.hero.badgeText}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#FDFBF7] mb-6 leading-tight">
            {KALYAN_HOMEPAGE_CMS.hero.headline}
          </h1>

          <p className="text-base sm:text-lg text-[#FDFBF7]/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {KALYAN_HOMEPAGE_CMS.hero.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C5A059] text-[#0D3B2E] font-semibold text-sm hover:bg-[#C5A059]/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>{KALYAN_HOMEPAGE_CMS.hero.ctaPrimaryText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#FDFBF7]/30 text-[#FDFBF7] font-semibold text-sm hover:bg-[#FDFBF7]/10 transition-all flex items-center justify-center"
            >
              <span>{KALYAN_HOMEPAGE_CMS.hero.ctaSecondaryText}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Value Propositions */}
      <section className="py-12 border-b border-[#0D3B2E]/10 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {KALYAN_BRAND_CONFIG.valuePropositions.map((prop: ValueProp, idx: number) => (
            <div key={idx} className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#0D3B2E]/5 text-[#0D3B2E] flex items-center justify-center mb-3">
                {idx === 0 && <Leaf className="w-6 h-6 text-[#0D3B2E]" />}
                {idx === 1 && <Award className="w-6 h-6 text-[#C5A059]" />}
                {idx === 2 && <ShieldCheck className="w-6 h-6 text-[#0D3B2E]" />}
                {idx === 3 && <Heart className="w-6 h-6 text-[#C5A059]" />}
              </div>
              <h4 className="font-serif font-bold text-sm text-[#0D3B2E] mb-1">{prop.title}</h4>
              <p className="text-xs text-[#1A2421]/70 leading-relaxed">{prop.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A059] block mb-2">
              Artisanal Preparations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0D3B2E]">
              Best Selling Formulations
            </h2>
          </div>
          <Link href="/products" className="text-sm font-semibold text-[#0D3B2E] hover:text-[#C5A059] transition-colors flex items-center gap-1 mt-4 md:mt-0">
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {KALYAN_PRODUCTS.map((product: AyurvedicProduct) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 border border-[#0D3B2E]/10 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#C5A059] font-medium mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#0D3B2E]/5 font-semibold text-[#0D3B2E]">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                    <span className="font-semibold text-[#1A2421]">{product.rating}</span>
                    <span className="text-[#1A2421]/50">({product.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0D3B2E] group-hover:text-[#C5A059] transition-colors mb-2">
                  {product.name}
                </h3>

                <p className="text-xs text-[#1A2421]/70 mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {product.keyIngredients.slice(0, 3).map((ing: string, i: number) => (
                    <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDFBF7] text-[#0D3B2E] border border-[#0D3B2E]/10">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#0D3B2E]/5">
                <div>
                  <span className="text-xs text-[#1A2421]/50 block">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl font-bold text-[#0D3B2E]">₹{product.priceInr}</span>
                    {product.originalPriceInr && (
                      <span className="text-xs text-[#1A2421]/40 line-through">₹{product.originalPriceInr}</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="px-4 py-2.5 rounded-xl bg-[#0D3B2E] text-[#FDFBF7] text-xs font-semibold hover:bg-[#C5A059] hover:text-[#0D3B2E] transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Doctor Recommendation Banner */}
      <section className="bg-[#0D3B2E] text-[#FDFBF7] py-20 px-6 my-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059] block mb-3">
              Physician Approved
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FDFBF7] mb-6 leading-tight">
              {KALYAN_HOMEPAGE_CMS.doctorBanner.title}
            </h2>
            <blockquote className="italic text-base text-[#FDFBF7]/90 mb-6 font-light border-l-2 border-[#C5A059] pl-4">
              "{KALYAN_HOMEPAGE_CMS.doctorBanner.quote}"
            </blockquote>
            <div>
              <span className="font-serif font-bold text-lg text-[#C5A059] block">
                {KALYAN_HOMEPAGE_CMS.doctorBanner.doctorName}
              </span>
              <span className="text-xs text-[#FDFBF7]/70 font-light block">
                {KALYAN_HOMEPAGE_CMS.doctorBanner.qualification}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#FDFBF7] text-[#0D3B2E] p-8 rounded-2xl border border-[#C5A059]/40 shadow-xl">
            <h3 className="font-serif font-bold text-xl mb-3 text-[#0D3B2E]">AYUSH Certified</h3>
            <p className="text-xs text-[#1A2421]/80 mb-6 leading-relaxed">
              All formulations comply with Indian Pharmacopoeia standards and undergo multi-stage purity testing in Bhilai.
            </p>
            <div className="space-y-2 text-xs font-semibold text-[#0D3B2E]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Heavy Metal Screened</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Zero Mineral Oils or Parabens</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                <span>Cold-Pressed Extraction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D3B2E] text-[#FDFBF7] border-t border-[#C5A059]/20 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <span className="font-serif text-2xl font-bold text-[#C5A059] block mb-3">
              {KALYAN_STORE_CONFIG.name}
            </span>
            <p className="text-xs text-[#FDFBF7]/70 font-light leading-relaxed mb-4">
              {KALYAN_STORE_CONFIG.tagline}
            </p>
            <span className="text-xs text-[#C5A059] font-medium block">
              {KALYAN_STORE_CONFIG.address}
            </span>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-[#FDFBF7] uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2 text-xs text-[#FDFBF7]/80">
              <li><Link href="/products" className="hover:text-[#C5A059] transition-colors">Hair Care Oils</Link></li>
              <li><Link href="/products" className="hover:text-[#C5A059] transition-colors">Kumkumadi Tailam</Link></li>
              <li><Link href="/products" className="hover:text-[#C5A059] transition-colors">Ashwagandha Gold</Link></li>
              <li><Link href="/products" className="hover:text-[#C5A059] transition-colors">Joint Relief Balm</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-[#FDFBF7] uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2 text-xs text-[#FDFBF7]/80">
              <li><Link href="/contact" className="hover:text-[#C5A059] transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-[#C5A059] transition-colors">Our Bhilai Heritage</Link></li>
              <li><Link href="/blog" className="hover:text-[#C5A059] transition-colors">Ayurvedic Journal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-sm text-[#FDFBF7] uppercase tracking-wider mb-4">Direct Support</h4>
            <p className="text-xs text-[#FDFBF7]/80 mb-2">Phone: {KALYAN_STORE_CONFIG.supportPhone}</p>
            <p className="text-xs text-[#FDFBF7]/80 mb-4">Email: {KALYAN_STORE_CONFIG.supportEmail}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-[#FDFBF7]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FDFBF7]/60">
          <p>© 2026 {KALYAN_STORE_CONFIG.name}. All rights reserved.</p>
          <p>Powered by SynoCommerce Enterprise Commerce Platform</p>
        </div>
      </footer>
    </div>
  );
}
