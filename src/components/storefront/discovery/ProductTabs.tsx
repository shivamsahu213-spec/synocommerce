'use client';

import { CheckCircle2, FileText, ShieldCheck, Truck } from 'lucide-react';
import React, { useState } from 'react';

export function ProductTabs({
  description,
  specifications,
}: {
  description: string;
  specifications: Record<string, string>;
}) {
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'returns'>('desc');

  return (
    <div className="space-y-6 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl">
      {/* Tab Buttons */}
      <div className="flex border-b border-slate-800 overflow-x-auto gap-8 text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('desc')}
          className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'desc' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Description & Heritage
        </button>
        <button
          onClick={() => setActiveTab('specs')}
          className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'specs' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'shipping' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Shipping & Delivery
        </button>
        <button
          onClick={() => setActiveTab('returns')}
          className={`pb-4 border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'returns' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Return Policy
        </button>
      </div>

      {/* Tab Content */}
      <div className="text-sm text-slate-300 font-light leading-relaxed">
        {activeTab === 'desc' && (
          <div className="space-y-4">
            <p>{description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <strong className="font-bold text-white block">100% Herbal Purity</strong>
                  <span>Free of parabens, mineral oils, synthetic fragrances, or silicones.</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <strong className="font-bold text-white block">AYUSH Certified</strong>
                  <span>Tested across multi-stage heavy metal screening in Bhilai.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(specifications).map(([key, val], idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between text-xs">
                <span className="text-slate-400 font-medium">{key}</span>
                <span className="font-bold text-white">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Complimentary Express Shipping</span>
            </div>
            <p className="text-xs">
              Orders placed before 2:00 PM IST ship same day via BlueDart / DHL Express. Guaranteed delivery within 2-3 business days across India.
            </p>
          </div>
        )}

        {activeTab === 'returns' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
            <p className="text-xs">
              If you are not completely delighted with your formulation, return the unused portion within 30 days for a full refund.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
