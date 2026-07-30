/**
 * Settings Feature View
 * @module apps/admin/src/features/settings/SettingsView
 */

'use client';

import React, { useState } from 'react';
import { Settings, Globe, DollarSign, Shield, Zap, Bell, Check } from 'lucide-react';

export function SettingsView() {
  const [storeName, setStoreName] = useState('SynoCommerce Storefront US');
  const [defaultCurrency, setDefaultCurrency] = useState('USD');
  const [defaultLocale, setDefaultLocale] = useState('en-US');
  const [featureFlags, setFeatureFlags] = useState({
    multiCurrency: true,
    instantSearch: true,
    b2bQuotes: false,
    taxJarAutomation: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleFlag = (key: keyof typeof featureFlags) => {
    setFeatureFlags({ ...featureFlags, [key]: !featureFlags[key] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Global System Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Configure store settings, localization, currencies, taxes, and feature flags.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* General Store Configuration */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-100 pb-3 dark:border-slate-800 flex items-center gap-2">
            <Globe className="h-4 w-4 text-indigo-500" />
            General & Localization
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Default Currency</label>
              <select
                value={defaultCurrency}
                onChange={(e) => setDefaultCurrency(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 p-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="USD">USD - United States Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feature Flags */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-100 pb-3 dark:border-slate-800 flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-500" />
            Kernel Feature Flags & Capability Toggles
          </h3>
          <div className="space-y-3 text-sm">
            {Object.entries(featureFlags).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between py-1">
                <div>
                  <div className="font-medium capitalize text-slate-900 dark:text-slate-100">{key.replace(/([A-Z])/g, ' $1')}</div>
                  <div className="text-xs text-slate-400">Toggle runtime capability enablement for active stores.</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFlag(key as any)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    val ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${val ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700 shadow-sm"
          >
            Save Settings
          </button>
          {saved && (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <Check className="h-4 w-4" /> Settings updated successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
