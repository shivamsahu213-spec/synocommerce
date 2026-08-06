'use client';

import { Maximize2, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

import { ImageZoom } from './ImageZoom';

export function ProductGallery({
  mainEmoji,
  galleryEmojis,
  badgeText = 'Authentic Ayurvedic Formulation',
}: {
  mainEmoji: string;
  galleryEmojis: string[];
  badgeText?: string;
}) {
  const [selectedEmoji, setSelectedEmoji] = useState(mainEmoji);
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Image Display Box */}
      <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 flex items-center justify-center text-9xl shadow-2xl overflow-hidden group">
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-slate-700/50 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {badgeText}
          </span>
        </div>

        <button
          onClick={() => setZoomOpen(true)}
          className="absolute top-4 right-4 z-10 p-3 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Zoom Image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <span className="transform group-hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => setZoomOpen(true)}>
          {selectedEmoji}
        </span>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {galleryEmojis.map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedEmoji(emoji)}
            className={`w-20 h-20 rounded-2xl bg-slate-900 border flex items-center justify-center text-4xl shrink-0 transition-all ${
              selectedEmoji === emoji
                ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-950/30'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Fullscreen Zoom Modal */}
      <ImageZoom emoji={selectedEmoji} isOpen={zoomOpen} onClose={() => setZoomOpen(false)} />
    </div>
  );
}
