import React from 'react';
import { KALYAN_STORE_CONFIG, KALYAN_CONTACT_CMS } from '@kalyan-ayurvedic';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2421] font-sans">
      <header className="bg-[#0D3B2E] text-[#FDFBF7] py-16 px-6 text-center">
        <h1 className="font-serif text-4xl font-bold mb-2">{KALYAN_CONTACT_CMS.title}</h1>
        <p className="text-sm text-[#FDFBF7]/80 max-w-xl mx-auto font-light">{KALYAN_CONTACT_CMS.subtitle}</p>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-2xl border border-[#0D3B2E]/10 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#0D3B2E] mb-4">Bhilai Bhavan Details</h2>

          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-[#C5A059] shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-sm text-[#0D3B2E]">Store Address</h4>
              <p className="text-xs text-[#1A2421]/80 leading-relaxed">
                {KALYAN_CONTACT_CMS.storeAddress.building}, {KALYAN_CONTACT_CMS.storeAddress.street}, {KALYAN_CONTACT_CMS.storeAddress.city}, {KALYAN_CONTACT_CMS.storeAddress.state} - {KALYAN_CONTACT_CMS.storeAddress.pincode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-sm text-[#0D3B2E]">Telephone Support</h4>
              <p className="text-xs text-[#1A2421]/80">{KALYAN_CONTACT_CMS.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MessageSquare className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-sm text-[#0D3B2E]">WhatsApp Consultations</h4>
              <p className="text-xs text-[#1A2421]/80">{KALYAN_CONTACT_CMS.whatsapp}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-sm text-[#0D3B2E]">Email Enquiries</h4>
              <p className="text-xs text-[#1A2421]/80">{KALYAN_CONTACT_CMS.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Clock className="w-5 h-5 text-[#C5A059] shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-sm text-[#0D3B2E]">Business Hours</h4>
              <p className="text-xs text-[#1A2421]/80">{KALYAN_CONTACT_CMS.businessHours}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-[#0D3B2E]/10 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#0D3B2E] mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#0D3B2E] mb-1">Your Full Name</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-[#0D3B2E]/20 text-xs focus:outline-none focus:border-[#C5A059]" placeholder="e.g. Ramesh Kumar" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0D3B2E] mb-1">Email Address</label>
              <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-[#0D3B2E]/20 text-xs focus:outline-none focus:border-[#C5A059]" placeholder="ramesh@example.com" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0D3B2E] mb-1">Message / Consultation Query</label>
              <textarea rows={4} className="w-full px-4 py-2.5 rounded-xl border border-[#0D3B2E]/20 text-xs focus:outline-none focus:border-[#C5A059]" placeholder="How can we assist your Ayurvedic wellness journey?"></textarea>
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-[#0D3B2E] text-[#FDFBF7] text-xs font-semibold hover:bg-[#C5A059] hover:text-[#0D3B2E] transition-all">
              Submit Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
