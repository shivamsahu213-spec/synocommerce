/**
 * Customers Feature View
 * @module apps/admin/src/features/customers/CustomersView
 */

'use client';

import { Calendar,Mail, ShoppingCart, Users } from 'lucide-react';
import React, { useState } from 'react';

import { ColumnDef,DataTable } from '../../components/shared/data-table';
import { CustomerItem,INITIAL_CUSTOMERS } from '../../lib/data-store';
import { formatCurrency } from '../../lib/utils';

export function CustomersView() {
  const [customers, setCustomers] = useState<CustomerItem[]>(INITIAL_CUSTOMERS);

  const columns: ColumnDef<CustomerItem>[] = [
    { key: 'name', header: 'Customer Name', render: (c) => <span className="font-semibold text-slate-900 dark:text-slate-100">{c.name}</span> },
    { key: 'email', header: 'Email' },
    { key: 'ordersCount', header: 'Orders Placed' },
    { key: 'totalSpent', header: 'Lifetime Value', render: (c) => formatCurrency(c.totalSpent) },
    { key: 'status', header: 'Status', render: (c) => <span className={`rounded px-2 py-0.5 text-xs font-semibold ${c.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}>{c.status}</span> },
    { key: 'joinedAt', header: 'Customer Since' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Customer Profiles</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">View customer lifetime value, order history, addresses, and active sessions.</p>
      </div>

      <DataTable data={customers} columns={columns} searchPlaceholder="Search customers by name or email..." />
    </div>
  );
}
