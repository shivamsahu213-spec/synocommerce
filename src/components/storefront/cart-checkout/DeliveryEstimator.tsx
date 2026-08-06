'use client';

import { MapPin, Truck } from 'lucide-react';
import React, { useState } from 'react';

export function DeliveryEstimator() {
  const [zipcode, setZipcode] = useState('');
  const [estimated, setEstimated] = useState('');

  const handleEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipcode.length >= 5) {
      setEstimated('Guaranteed Express Delivery by Saturday, Aug 8');
    }
  };

  return (
    <div className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-3xl p-5 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
        <Truck className="w-4 h-4 text-emerald-400" />
        <span>Estimate Shipping & Delivery Date</span>
      </div>

      <form onSubmit={handleEstimate} className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            placeholder="Enter Pincode / Zipcode..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
        >
          Check
        </button>
      </form>

      {estimated && (
        <span className="text-xs font-bold text-emerald-400 block pt-1 animate-in fade-in">
          ✓ {estimated}
        </span>
      )}
    </div>
  );
}
