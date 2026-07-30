/**
 * Plugin Manager Feature View
 * @module apps/admin/src/features/plugins/PluginsView
 */

'use client';

import React, { useState } from 'react';
import { Puzzle, CheckCircle, Power, RefreshCw, AlertCircle } from 'lucide-react';
import { INITIAL_PLUGINS, PluginItem } from '../../lib/data-store';

export function PluginsView() {
  const [plugins, setPlugins] = useState<PluginItem[]>(INITIAL_PLUGINS);

  const togglePlugin = (id: string) => {
    setPlugins(
      plugins.map((p) =>
        p.id === id ? { ...p, status: p.status === 'ENABLED' ? 'DISABLED' : 'ENABLED' } : p
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Plugin Manager</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Discover, install, enable, and inspect active commerce extensions and integrations.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {plugins.map((p) => (
          <div
            key={p.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="rounded bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {p.category}
                </span>
                <span className="text-xs font-mono text-slate-400">v{p.version}</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">{p.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.description}</p>
              <div className="text-[11px] text-slate-400">By {p.author}</div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  p.status === 'ENABLED' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                }`}
              >
                {p.status === 'ENABLED' ? <CheckCircle className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                {p.status}
              </span>

              <button
                onClick={() => togglePlugin(p.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  p.status === 'ENABLED'
                    ? 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/40 dark:text-red-400'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <Power className="h-3.5 w-3.5" />
                {p.status === 'ENABLED' ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
