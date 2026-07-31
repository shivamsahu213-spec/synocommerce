import React from 'react';
import { KALYAN_STORE_CONFIG, KALYAN_ABOUT_CMS } from '@kalyan-ayurvedic';

export const metadata = {
  title: `Our Heritage | ${KALYAN_STORE_CONFIG.name}`,
  description: KALYAN_ABOUT_CMS.story,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A2421] font-sans">
      <header className="bg-[#0D3B2E] text-[#FDFBF7] py-16 px-6 text-center">
        <span className="text-xs uppercase tracking-widest text-[#C5A059] block mb-2 font-semibold">
          Estd 1984 • Bhilai, Chhattisgarh
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold">{KALYAN_ABOUT_CMS.title}</h1>
        <p className="text-sm sm:text-base text-[#FDFBF7]/80 max-w-xl mx-auto mt-4 font-light">
          {KALYAN_ABOUT_CMS.subtitle}
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg text-[#1A2421]/90 mb-16 leading-relaxed">
          <p className="text-lg font-serif italic text-[#0D3B2E] border-l-4 border-[#C5A059] pl-4 mb-8">
            "{KALYAN_ABOUT_CMS.story}"
          </p>
        </div>

        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-[#0D3B2E] mb-8 text-center">
            Our Journey Across Decades
          </h2>
          <div className="space-y-6">
            {KALYAN_ABOUT_CMS.milestones.map((item: { year: number; event: string }, idx: number) => (
              <div key={idx} className="flex gap-4 items-start bg-white p-6 rounded-xl border border-[#0D3B2E]/10 shadow-sm">
                <span className="font-serif font-bold text-xl text-[#C5A059]">{item.year}</span>
                <p className="text-sm font-medium text-[#1A2421]">{item.event}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="font-serif text-2xl font-bold text-[#0D3B2E] mb-8 text-center">
            Supervising Ayurvedic Vaidyas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {KALYAN_ABOUT_CMS.vaidyaTeam.map((doctor: { name: string; role: string; experience: string; bio: string }, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-[#0D3B2E]/10 shadow-sm">
                <h3 className="font-serif font-bold text-lg text-[#0D3B2E] mb-1">{doctor.name}</h3>
                <span className="text-xs font-semibold text-[#C5A059] block mb-2">{doctor.role}</span>
                <span className="text-xs text-[#1A2421]/60 block mb-3">{doctor.experience}</span>
                <p className="text-xs text-[#1A2421]/80 leading-relaxed">{doctor.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
