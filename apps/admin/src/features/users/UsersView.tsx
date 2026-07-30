/**
 * Users & Roles Feature View
 * @module apps/admin/src/features/users/UsersView
 */

'use client';

import React, { useState } from 'react';
import { Shield, UserCheck, Key, Lock, CheckCircle } from 'lucide-react';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  mfaEnabled: boolean;
}

export function UsersView() {
  const [users] = useState<UserRecord[]>([
    { id: 'usr_1', name: 'System Admin', email: 'admin@synocommerce.com', role: 'Super Administrator', status: 'ACTIVE', mfaEnabled: true },
    { id: 'usr_2', name: 'Sarah Connor', email: 'sarah.c@synocommerce.com', role: 'Store Manager', status: 'ACTIVE', mfaEnabled: false },
    { id: 'usr_3', name: 'Alex Mercer', email: 'alex.m@synocommerce.com', role: 'Support Agent', status: 'ACTIVE', mfaEnabled: false },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Users & Role Access Control</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Integrated with IAM Module for RBAC permission matrix, roles, and user invitations.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* User Accounts List */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
            System Administrators & Staff
          </h3>
          <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((u) => (
              <div key={u.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">{u.name}</div>
                  <div className="text-xs text-slate-400">{u.email}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {u.role}
                  </span>
                  {u.mfaEnabled && (
                    <span className="flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      <Lock className="h-3 w-3" /> MFA Active
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Permission Matrix Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-100 pb-3 dark:border-slate-800">
            Permission Matrix Rules
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 dark:text-slate-300">Catalog Management (`catalog:*`)</span>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 dark:text-slate-300">Order Processing (`orders:*`)</span>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 dark:text-slate-300">Financial Refunds (`payments:refund`)</span>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600 dark:text-slate-300">System Governance (`kernel:*`)</span>
              <CheckCircle className="h-4 w-4 text-indigo-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
