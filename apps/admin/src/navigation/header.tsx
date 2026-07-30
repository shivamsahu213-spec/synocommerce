/**
 * Admin Top Header Navigation Component
 * @module apps/admin/src/navigation/header
 */

'use client';

import React from 'react';
import { Search, Bell, Sun, Moon, LogOut, User } from 'lucide-react';
import { useAuth } from '../providers/auth-provider';
import { useTheme } from '../providers/theme-provider';

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Search Input */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Quick search (Ctrl + K)..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-500" />
        </button>

        {/* User Profile Dropdown */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-bold text-xs text-white">
            {user?.firstName?.[0] || 'A'}
          </div>
          <div className="text-left text-xs">
            <div className="font-semibold text-slate-800 dark:text-slate-100">{user?.firstName} {user?.lastName}</div>
            <div className="text-[10px] text-slate-400">{user?.email}</div>
          </div>

          <button
            onClick={logout}
            className="ml-2 rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
            title="Log Out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
