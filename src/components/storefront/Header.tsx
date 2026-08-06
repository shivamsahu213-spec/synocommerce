'use client';

import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { MegaMenu } from './MegaMenu';
import { SearchBar } from './SearchBar';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand Emblem Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center font-bold text-lg text-white">
                S
              </div>
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-white block group-hover:text-indigo-400 transition-colors">
                SynoCommerce
              </span>
              <span className="text-[10px] tracking-widest uppercase text-amber-400 block font-semibold">
                Luxury Commerce Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <div
              onMouseEnter={() => setActiveMenu('categories')}
              className="py-2 cursor-pointer hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Categories</span>
            </div>
            <div
              onMouseEnter={() => setActiveMenu('collections')}
              className="py-2 cursor-pointer hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Collections</span>
            </div>
            <Link href="/brands" className="hover:text-amber-400 transition-colors">
              Brands
            </Link>
            <Link href="/deals" className="hover:text-amber-400 transition-colors text-amber-400 font-bold">
              🔥 Deals & Sales
            </Link>
          </nav>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all flex items-center gap-2 text-xs font-medium px-4"
          >
            <Search className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Search products...</span>
          </button>

          <Link
            href="/deals"
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-700 transition-all relative"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          </Link>

          <Link
            href="/deals"
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Bag (2)</span>
          </Link>

          <Link
            href="/login"
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-all hidden sm:flex"
            aria-label="Account"
          >
            <User className="w-4 h-4" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MegaMenu Dropdown */}
      <MegaMenu activeCategory={activeMenu} onClose={() => setActiveMenu(null)} />

      {/* Search Modal */}
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3 text-sm font-medium text-slate-200">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-1">
              Home
            </Link>
            <Link href="/categories" onClick={() => setMobileMenuOpen(false)} className="py-1">
              Categories
            </Link>
            <Link href="/collections" onClick={() => setMobileMenuOpen(false)} className="py-1">
              Collections
            </Link>
            <Link href="/brands" onClick={() => setMobileMenuOpen(false)} className="py-1">
              Brands
            </Link>
            <Link href="/deals" onClick={() => setMobileMenuOpen(false)} className="py-1 text-amber-400 font-bold">
              🔥 Deals & Sales
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
