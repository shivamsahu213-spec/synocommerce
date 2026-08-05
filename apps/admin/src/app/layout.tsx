/**
 * Admin App Root Layout
 * @module apps/admin/src/app/layout
 */

import './globals.css';

import React from 'react';

import { Header } from '../navigation/header';
import { Sidebar } from '../navigation/sidebar';
import { AuthProvider } from '../providers/auth-provider';
import { ThemeProvider } from '../providers/theme-provider';

export const metadata = {
  title: 'SynoCommerce Admin Platform',
  description: 'Enterprise Administration Platform for SynoCommerce.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-950">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
