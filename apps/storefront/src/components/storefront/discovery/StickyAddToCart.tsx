'use client';

import { ShoppingBag, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function StickyAddToCart({
  productName,
  price,
  onAddToCart,
  onBuyNow,
}: {
  productName: string;
  price: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800 p-4 shadow-2xl animate-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <h4 className="font-serif font-bold text-sm text-white">{productName}</h4>
          <span className="text-xs text-emerald-400 font-bold">${price.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={onAddToCart}
            className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-600 text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={onBuyNow}
            className="flex-1 sm:flex-initial px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
