'use client';

import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import { AddressCard, AddressType } from './AddressCard';

export function AddressSelector({
  selectedAddressId,
  onSelectAddress,
}: {
  selectedAddressId: string;
  onSelectAddress: (id: string) => void;
}) {
  const [addresses, setAddresses] = useState<AddressType[]>([
    {
      id: 'a1',
      name: 'Shivam Sahu (Home)',
      street: '14, Bhilai Bhavan, Botanical Enclave',
      city: 'Bhilai',
      state: 'Chhattisgarh',
      zip: '490006',
      phone: '+91 98765 43210',
      isDefault: true,
    },
    {
      id: 'a2',
      name: 'SynoStack HQ (Office)',
      street: 'Tower 4, Tech Park, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560038',
      phone: '+91 80 5555 0199',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && street && city && zip && phone) {
      const newAddr: AddressType = {
        id: `a${Date.now()}`,
        name,
        street,
        city,
        state: state || 'Chhattisgarh',
        zip,
        phone,
      };
      setAddresses([...addresses, newAddr]);
      onSelectAddress(newAddr.id);
      setShowForm(false);
      setName('');
      setStreet('');
      setCity('');
      setZip('');
      setPhone('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <AddressCard
            key={addr.id}
            address={addr}
            isSelected={selectedAddressId === addr.id}
            onSelect={onSelectAddress}
          />
        ))}
      </div>

      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-3.5 rounded-2xl bg-slate-900 border border-dashed border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4 text-indigo-400" />
          <span>Add New Shipping Address</span>
        </button>
      ) : (
        <form onSubmit={handleAddAddress} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <h4 className="font-serif font-bold text-sm text-white">Add Shipping Address</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <input
              type="text"
              required
              placeholder="Full Name (e.g. Shivam Sahu)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              required
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              required
              placeholder="Street / Flat / Landmark"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className="sm:col-span-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              required
              placeholder="City (e.g. Bhilai)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              required
              placeholder="State & Zipcode"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
            >
              Save & Select
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
