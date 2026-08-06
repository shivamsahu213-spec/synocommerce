import { KALYAN_BLOG_POSTS } from '@kalyan-ayurvedic';
import { Clock, User } from 'lucide-react';
import React from 'react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2421] font-sans">
      <header className="bg-[#0D3B2E] text-[#FDFBF7] py-16 px-6 text-center">
        <h1 className="font-serif text-4xl font-bold mb-2">Ayurvedic Wellness Journal</h1>
        <p className="text-sm text-[#FDFBF7]/80 max-w-xl mx-auto font-light">
          Insights on Doshas, seasonal routines, botanical herbs, and holistic living from our Bhilai Vaidyas.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {KALYAN_BLOG_POSTS.map((post: { id: string; slug: string; title: string; category: string; author: string; readTime: string; date: string; excerpt: string }) => (
          <article key={post.id} className="bg-white rounded-2xl p-6 border border-[#0D3B2E]/10 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] block mb-2">
                {post.category}
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0D3B2E] mb-3 leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-[#1A2421]/70 mb-4 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#0D3B2E]/5 flex items-center justify-between text-[11px] text-[#1A2421]/60">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3 text-[#C5A059]" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C5A059]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
