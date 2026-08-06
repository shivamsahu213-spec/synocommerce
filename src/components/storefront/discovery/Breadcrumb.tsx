'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium py-3">
      <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          {item.href ? (
            <Link href={item.href} className="hover:text-amber-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-200 font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
