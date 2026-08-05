/**
 * Orders Feature View
 * @module apps/admin/src/features/orders/OrdersView
 */

'use client';

import { CreditCard, FileText, RefreshCw,ShoppingBag, Truck } from 'lucide-react';
import React, { useState } from 'react';

import { ColumnDef,DataTable } from '../../components/shared/data-table';
import { INITIAL_ORDERS, OrderItem } from '../../lib/data-store';
import { formatCurrency, formatDate } from '../../lib/utils';

export function OrdersView() {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);

  const columns: ColumnDef<OrderItem>[] = [
    { key: 'orderNumber', header: 'Order Number', render: (o) => <span className="font-semibold text-indigo-600 dark:text-indigo-400">{o.orderNumber}</span> },
    { key: 'customerName', header: 'Customer' },
    { key: 'total', header: 'Total', render: (o) => formatCurrency(o.total) },
    { key: 'paymentStatus', header: 'Payment Status', render: (o) => <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">{o.paymentStatus}</span> },
    { key: 'fulfillmentStatus', header: 'Fulfillment', render: (o) => <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">{o.fulfillmentStatus}</span> },
    { key: 'createdAt', header: 'Date', render: (o) => formatDate(o.createdAt) },
    {
      key: 'actions',
      header: 'Actions',
      render: (o) => (
        <button
          onClick={() => setSelectedOrder(o)}
          className="rounded border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Order Management</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Track, fulfill, refund, and inspect order timelines.</p>
      </div>

      <DataTable data={orders} columns={columns} searchPlaceholder="Search orders by number or customer..." />

      {/* Order Details Drawer */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/50 backdrop-blur-sm">
          <div className="h-full w-full max-w-lg border-l border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{selectedOrder.orderNumber}</h2>
                <p className="text-xs text-slate-400">Placed on {formatDate(selectedOrder.createdAt)}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-6 text-sm">
              {/* Summary */}
              <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{selectedOrder.customerEmail}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 dark:border-slate-700">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Total Amount:</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Order Timeline */}
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">Order Activity Timeline</h3>
                <div className="space-y-3 border-l-2 border-slate-200 pl-4 dark:border-slate-800 text-xs">
                  <div className="relative">
                    <span className="absolute -left-[21px] top-0 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <div className="font-semibold text-slate-900 dark:text-slate-100">Payment Processed</div>
                    <div className="text-slate-400">Authorized via Stripe (ch_3M82x...)</div>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[21px] top-0 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    <div className="font-semibold text-slate-900 dark:text-slate-100">Fulfillment Initiated</div>
                    <div className="text-slate-400">Assigned to Warehouse US-EAST-1</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-4">
                <button className="flex-1 rounded-lg bg-indigo-600 py-2.5 font-semibold text-white hover:bg-indigo-700">
                  Generate Invoice
                </button>
                <button className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 font-semibold text-red-600 hover:bg-red-100 dark:border-red-950 dark:bg-red-950/40 dark:text-red-400">
                  Process Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
