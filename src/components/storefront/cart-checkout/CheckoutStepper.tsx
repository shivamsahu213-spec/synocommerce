'use client';

import { Check, CreditCard, MapPin, ShieldCheck, Truck } from 'lucide-react';
import React from 'react';

export type CheckoutStep = 'address' | 'shipping' | 'payment' | 'review';

export function CheckoutStepper({ currentStep }: { currentStep: CheckoutStep }) {
  const steps = [
    { id: 'address', label: '1. Shipping Address', icon: MapPin },
    { id: 'shipping', label: '2. Delivery Method', icon: Truck },
    { id: 'payment', label: '3. Payment Method', icon: CreditCard },
    { id: 'review', label: '4. Order Review', icon: ShieldCheck },
  ];

  const stepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-4 backdrop-blur-xl mb-8">
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isCompleted = idx < stepIndex;
          const isCurrent = idx === stepIndex;

          return (
            <div key={s.id} className="flex items-center gap-2 shrink-0">
              <div
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isCurrent
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : isCompleted
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-950 text-slate-500 border border-slate-800'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 text-emerald-400" /> : <Icon className="w-4 h-4" />}
                <span>{s.label}</span>
              </div>
              {idx < steps.length - 1 && <span className="text-slate-700 hidden sm:inline">•</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
