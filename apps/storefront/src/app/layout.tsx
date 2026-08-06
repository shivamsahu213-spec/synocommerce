/**
 * Storefront Root App Layout
 * @module apps/storefront/src/app/layout
 */

import './globals.css';

import React from 'react';

import { CartDrawer } from '../features/cart/CartDrawer';
import { Footer } from '../navigation/footer';
import { Navbar } from '../navigation/navbar';
import { StorefrontProvider } from '../providers/storefront-provider';

export const metadata = {
  title: 'SynoStore - Headless Enterprise Storefront',
  description: 'Production-grade headless storefront powered by SynoCommerce Framework.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StorefrontProvider>
          <Navbar />
          <CartDrawer />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </StorefrontProvider>
      </body>
    </html>
  );
}
