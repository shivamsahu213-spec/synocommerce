/**
 * Admin Sidebar Navigation Component
 * @module apps/admin/src/navigation/sidebar
 */

'use client';

import {
  Building2,
  ChevronDown,
  LayoutDashboard,
  Package,
  Puzzle,
  Settings,
  ShoppingCart,
  Sparkles,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { useAuth } from '../providers/auth-provider';

export function Sidebar() {
  const pathname = usePathname() || '/';
  const { activeTenant, activeStore, setTenant, setStore } = useAuth();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Catalog', href: '/catalog', icon: Package },
    { name: 'Orders', href: '/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/customers', icon: Users },
    { name: 'Users & Roles', href: '/users', icon: Users },
    { name: 'Plugins', href: '/plugins', icon: Puzzle },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-slate-900 text-slate-100 dark:border-slate-800">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-slate-800">
        <div className="flex items-center gap-2 font-bold text-lg text-indigo-400">
          <Sparkles className="h-5 w-5 text-indigo-500" />
          <span>SynoAdmin</span>
        </div>
      </div>

      {/* Tenant / Store Workspace Selector */}
      <div className="p-3 border-b border-slate-800 space-y-2">
        <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Workspace</div>
        <div className="flex items-center justify-between rounded-lg bg-slate-800/80 px-3 py-2 text-xs">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-indigo-400" />
            <div>
              <div className="font-semibold text-slate-200">{activeTenant}</div>
              <div className="text-[10px] text-slate-400">{activeStore}</div>
            </div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
        SynoCommerce Framework v1.0.0
      </div>
    </aside>
  );
}
