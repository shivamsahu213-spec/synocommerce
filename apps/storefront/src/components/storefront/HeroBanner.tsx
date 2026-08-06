'use client';

import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'Spring / Summer 2026 Release',
      title: 'Redefining Modern Commerce Luxury',
      subtitle: 'Handcrafted botanical elixirs, high-end acoustic audio, and artisanal silk creations.',
      ctaPrimary: 'Shop New Arrivals',
      ctaSecondary: 'View Lookbook',
      accentColor: 'from-indigo-600 via-purple-600 to-amber-500',
      imageEmoji: '✨',
      metrics: [
        { label: 'AYUSH Purity', val: '100%' },
        { label: 'Crafted In', val: 'Bhilai' },
        { label: 'Rating', val: '4.95 ★' },
      ],
    },
    {
      badge: 'Ayurvedic Botanical Reserve',
      title: 'Bhilai Heritage Kumkumadi Saffron',
      subtitle: 'Pure Kashmir saffron infused in cold-pressed sesame oil. Timeless glow since 1984.',
      ctaPrimary: 'Explore Formulations',
      ctaSecondary: 'Our Heritage',
      accentColor: 'from-amber-600 via-emerald-700 to-indigo-900',
      imageEmoji: '🌿',
      metrics: [
        { label: 'Herbal Formula', val: 'Traditional' },
        { label: 'Certified', val: '100% Organic' },
        { label: 'Delivery', val: 'Express' },
      ],
    },
  ];

  const slide = slides[currentSlide] || slides[0]!;

  return (
    <section className="relative bg-slate-950 text-slate-100 py-24 px-6 overflow-hidden border-b border-slate-800">
      {/* Background glow gradient */}
      <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br ${slide.accentColor} opacity-20 blur-3xl transition-all duration-700`}></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-amber-400 text-xs font-semibold uppercase tracking-widest shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{slide.badge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            {slide.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl font-light leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/products"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 hover:scale-105"
            >
              <span>{slide.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/categories"
              className="px-8 py-4 rounded-full bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-200 font-semibold text-sm transition-all hover:bg-slate-900"
            >
              <span>{slide.ctaSecondary}</span>
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80">
            {slide.metrics.map((m, idx) => (
              <div key={idx}>
                <span className="text-xs text-slate-400 block">{m.label}</span>
                <span className="font-serif font-bold text-lg text-amber-400">{m.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="lg:col-span-5 relative">
          <div className="w-full aspect-square rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-400 text-xs font-semibold border border-indigo-500/30">
                Premium Drop
              </span>
              <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
            </div>

            <div className="text-center my-auto py-8">
              <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {slide.imageEmoji}
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Apple Store & Shopify Aesthetic</h3>
              <p className="text-xs text-slate-400 mt-2">Ultra-responsive glassmorphism layout</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Authenticity Verified
              </span>
              <span className="text-indigo-400 font-bold">Limited Edition</span>
            </div>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${currentSlide === idx ? 'bg-amber-400 w-8' : 'bg-slate-800'}`}
              />
            ))}

            <button
              onClick={() => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
