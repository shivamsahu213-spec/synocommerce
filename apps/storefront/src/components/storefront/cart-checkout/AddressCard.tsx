'use client';

import { CheckCircle2, MapPin } from 'lucide-react';
import React from 'react';

export interface AddressType {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault?: boolean | undefined;
}

export function AddressCard({
  address,
  isSelected,
  onSelect,
}: {
  address: AddressType;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      onClick={() => onSelect(address.id)}
      className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 relative ${
        isSelected
          ? 'bg-gradient-to-br from-indigo-950/40 to-slate-900 border-indigo-500 shadow-xl ring-2 ring-indigo-500/20'
          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-indigo-400" />
          <h4 className="font-serif font-bold text-sm text-white">{address.name}</h4>
          {address.isDefault && (
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 font-bold border border-indigo-500/30">
              Default
            </span>
          )}
        </div>
        {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
      </div>

      <div className="text-xs text-slate-300 space-y-1 font-light">
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state} - {address.zip}
        </p>
        <p className="text-slate-400 pt-1">Phone: {address.phone}</p>
      </div>
    </div>
  );
}
