/**
 * Storefront Navbar Component
 * @module apps/storefront/src/navigation/navbar
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Search, User, Sparkles, Menu, X } from 'lucide-react';
import { useStorefront } from '../providers/storefront-provider';
import { CartItem } from '../lib/commerce-client';

export function Navbar() {
  const router = useRouter();
  const { cart, wishlist, openCartDrawer, currency, setCurrency } = useStorefront();
  const [searchQuery, setSearchQuery] = useState('');

  const totalCartCount = cart.items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <Sparkles className="h-6 w-6 text-indigo-500" />
          <span>SynoStore</span>
        </Link>

        {/* Category Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/products" className="hover:text-white transition-colors">All Products</Link>
          <Link href="/products?category=Audio" className="hover:text-white transition-colors">Audio</Link>
          <Link href="/products?category=Accessories" className="hover:text-white transition-colors">Accessories</Link>
          <Link href="/products?category=Furniture" className="hover:text-white transition-colors">Furniture</Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex relative w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-800 bg-slate-900 py-1.5 pl-9 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
        </form>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Currency Dropdown */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-300 focus:outline-none"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>

          {/* Wishlist */}
          <Link href="/account" className="relative p-2 text-slate-300 hover:text-white" title="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* User Account */}
          <Link href="/account" className="p-2 text-slate-300 hover:text-white" title="Customer Account">
            <User className="h-5 w-5" />
          </Link>

          {/* Cart Trigger Drawer */}
          <button
            onClick={openCartDrawer}
            className="relative flex items-center gap-2 rounded-full bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700 transition-colors shadow-lg"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <span className="ml-1 rounded-full bg-white px-1.5 py-0.2 text-[10px] font-bold text-indigo-700">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
