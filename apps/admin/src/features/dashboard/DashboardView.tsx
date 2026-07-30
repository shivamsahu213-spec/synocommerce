/**
 * Enterprise Dashboard Feature View
 * @module apps/admin/src/features/dashboard/DashboardView
 */

'use client';

import React from 'react';
import { DollarSign, ShoppingCart, Users, Activity, TrendingUp, AlertTriangle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../../lib/data-store';
import { formatCurrency } from '../../lib/utils';

export function DashboardView() {
  const lowStockProducts = INITIAL_PRODUCTS.filter((p) => p.stock < 15);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Executive Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Real-time performance metrics and store operations monitor.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Gross Revenue</span>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">$248,920.00</div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="mr-1 h-3.5 w-3.5" />
            <span>+18.4% vs last month</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Orders</span>
            <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <ShoppingCart className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">1,420</div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="mr-1 h-3.5 w-3.5" />
            <span>+12.1% vs last month</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Customers</span>
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">3,890</div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="mr-1 h-3.5 w-3.5" />
            <span>+8.6% vs last month</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">System Health</span>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold text-emerald-600 dark:text-emerald-400">99.98%</div>
          <div className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">
            <span>All microservices operational</span>
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sales Trend Representation */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">Revenue Stream</h3>
              <p className="text-xs text-slate-500">Monthly sales progression across active channels</p>
            </div>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">2026 YTD</span>
          </div>
          <div className="flex h-48 items-end justify-between gap-2 pt-6">
            {[45, 60, 52, 78, 90, 68, 85, 110, 95, 120, 105, 140].map((val, idx) => (
              <div key={idx} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-indigo-600 transition-all hover:bg-indigo-500 dark:bg-indigo-500"
                  style={{ height: `${val}px` }}
                />
                <span className="text-[10px] text-slate-400">M{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Inventory Alerts */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>Low Stock Alerts</span>
          </div>
          <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{p.name}</div>
                  <div className="text-[10px] text-slate-400">{p.sku}</div>
                </div>
                <span className={`px-2 py-0.5 rounded font-bold ${p.stock === 0 ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'}`}>
                  {p.stock === 0 ? 'Out of stock' : `${p.stock} left`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 pb-3">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 text-xs uppercase text-slate-400 dark:bg-slate-800">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {INITIAL_ORDERS.map((ord) => (
                <tr key={ord.id}>
                  <td className="p-3 font-semibold text-indigo-600 dark:text-indigo-400">{ord.orderNumber}</td>
                  <td className="p-3">{ord.customerName}</td>
                  <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(ord.total)}</td>
                  <td className="p-3">
                    <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {ord.fulfillmentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
