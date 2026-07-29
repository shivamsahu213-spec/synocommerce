import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getAppRuntimeConfig } from '@config/runtime.config';
import { AppProviders } from '@shared/providers/app-providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(getAppRuntimeConfig().siteUrl),
  title: {
    default: 'SynoCommerce',
    template: '%s | SynoCommerce'
  },
  description: 'Enterprise-grade reusable ecommerce platform foundation.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
