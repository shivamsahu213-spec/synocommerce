'use client';

import { Building2, CheckCircle2, CreditCard, DollarSign, QrCode, Wallet } from 'lucide-react';
import React, { useState } from 'react';

export type PaymentType = 'card' | 'upi' | 'netbanking' | 'wallet' | 'cod' | 'emi';

export function PaymentMethodCard({
  selectedType,
  onSelectType,
}: {
  selectedType: PaymentType;
  onSelectType: (type: PaymentType) => void;
}) {
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const methods: { id: PaymentType; label: string; icon: React.ComponentType<{ className?: string }>; tag: string }[] = [
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, tag: 'Visa, MasterCard, Amex' },
    { id: 'upi', label: 'Instant UPI / QR', icon: QrCode, tag: 'GPay, PhonePe, Paytm, BHIM' },
    { id: 'netbanking', label: 'Net Banking', icon: Building2, tag: 'HDFC, ICICI, SBI, Axis' },
    { id: 'wallet', label: 'Digital Wallets', icon: Wallet, tag: 'Apple Pay, PayPal, Amazon Pay' },
    { id: 'cod', label: 'Cash on Delivery (COD)', icon: DollarSign, tag: 'Pay on Arrival' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methods.map((m) => {
          const Icon = m.icon;
          const isSelected = selectedType === m.id;
          return (
            <div
              key={m.id}
              onClick={() => onSelectType(m.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-gradient-to-br from-indigo-950/40 to-slate-900 border-indigo-500 shadow-xl ring-2 ring-indigo-500/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-indigo-400 shrink-0" />
                <div>
                  <h4 className="font-serif font-bold text-xs text-white">{m.label}</h4>
                  <span className="text-[10px] text-slate-400 block">{m.tag}</span>
                </div>
              </div>
              {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
            </div>
          );
        })}
      </div>

      {/* Expanded Payment Form Fields */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 animate-in fade-in">
        {selectedType === 'card' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-400" /> Enter Card Details
            </h4>
            <input
              type="text"
              placeholder="Card Number (4532 •••• •••• 8842)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="MM / YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <input
                type="password"
                maxLength={4}
                placeholder="CVC / CVV"
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value)}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}

        {selectedType === 'upi' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white flex items-center gap-2">
              <QrCode className="w-4 h-4 text-amber-400" /> UPI VPA Virtual Address
            </h4>
            <input
              type="text"
              placeholder="Enter UPI ID (e.g. shivam@okaxis)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-400">
              A collect request will be sent to your UPI app for instant approval.
            </p>
          </div>
        )}

        {selectedType === 'netbanking' && (
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-400" /> Select Popular Bank
            </h4>
            <select className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500">
              <option>HDFC Bank NetBanking</option>
              <option>ICICI Bank Retail</option>
              <option>State Bank of India (SBI)</option>
              <option>Axis Bank Internet Banking</option>
            </select>
          </div>
        )}

        {selectedType === 'wallet' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            Apple Pay / PayPal Express Checkout token will be generated on place order.
          </div>
        )}

        {selectedType === 'cod' && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-semibold">
            💵 Cash on Delivery verified. Please ensure exact change on delivery.
          </div>
        )}
      </div>
    </div>
  );
}
