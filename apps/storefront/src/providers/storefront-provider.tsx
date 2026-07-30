/**
 * Storefront Context Provider
 * @module apps/storefront/src/providers/storefront-provider
 */

'use client';

import React, { createContext, useContext, useState } from 'react';
import { CartAggregate, CartTotals, searchEngine, cartEngine } from '../lib/commerce-client';

export interface StorefrontContextType {
  cart: CartAggregate;
  cartTotals: CartTotals;
  isCartDrawerOpen: boolean;
  wishlist: string[]; // SKU array
  currency: string;
  setCurrency: (currency: string) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addToCart: (sku: string, quantity?: number) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  removeFromCart: (sku: string) => void;
  applyCoupon: (code: string) => void;
  toggleWishlist: (sku: string) => void;
}

const StorefrontContext = createContext<StorefrontContextType | undefined>(undefined);

export function StorefrontProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartAggregate>(() => {
    const newCart = new CartAggregate();
    return newCart;
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [currency, setCurrency] = useState('USD');

  const cartTotals = cartEngine.calculateTotals(cart);

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const addToCart = (sku: string, quantity = 1) => {
    const products = searchEngine.search({ term: sku });
    const product = products.find((p) => p.sku === sku);
    if (!product) return;

    cart.addItem({
      sku: product.sku,
      name: product.name,
      quantity,
      unitPrice: product.price,
      totalPrice: product.price * quantity,
    });

    setCart(Object.assign(new CartAggregate(cart.id, cart.customerId), cart));
    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (sku: string, quantity: number) => {
    cart.updateQuantity(sku, quantity);
    setCart(Object.assign(new CartAggregate(cart.id, cart.customerId), cart));
  };

  const removeFromCart = (sku: string) => {
    cart.removeItem(sku);
    setCart(Object.assign(new CartAggregate(cart.id, cart.customerId), cart));
  };

  const applyCoupon = (code: string) => {
    cart.applyCoupon(code);
    setCart(Object.assign(new CartAggregate(cart.id, cart.customerId), cart));
  };

  const toggleWishlist = (sku: string) => {
    if (wishlist.includes(sku)) {
      setWishlist(wishlist.filter((id) => id !== sku));
    } else {
      setWishlist([...wishlist, sku]);
    }
  };

  return (
    <StorefrontContext.Provider
      value={{
        cart,
        cartTotals,
        isCartDrawerOpen,
        wishlist,
        currency,
        setCurrency,
        openCartDrawer,
        closeCartDrawer,
        addToCart,
        updateQuantity,
        removeFromCart,
        applyCoupon,
        toggleWishlist,
      }}
    >
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
      </div>
    </StorefrontContext.Provider>
  );
}

export function useStorefront(): StorefrontContextType {
  const context = useContext(StorefrontContext);
  if (!context) {
    throw new Error('useStorefront must be used within a StorefrontProvider');
  }
  return context;
}
