import React from 'react';
import { Video, Scissors, Download, Globe, Wand2, Text } from 'lucide-react';

const features = [
  {
    icon: Video,
    title: 'Auto highlight detection',
    desc: 'Find the best 15–60s moments using AI on audio energy, keywords, and speaker changes.'
  },
  {
    icon: Text,
    title: 'Transcribe & translate',
    desc: 'Accurate transcripts with Whisper. Translate to English, Hindi, and more.'
  },
  {
    icon: Scissors,
    title: 'Smart 9:16 framing',
    desc: 'Auto-crop faces and text for vertical video with safe subtitle margins.'
  },
  {
    icon: Wand2,
    title: 'Viral titles & captions',
    desc: 'Generate hooks, descriptions, and hashtags optimized for each platform.'
  },
  {
    icon: Globe,
    title: 'Multiplatform export',
    desc: 'One click export for TikTok, Reels, and YouTube Shorts. Optional watermark.'
  },
  {
    icon: Download,
    title: 'Local or cloud processing',
    desc: 'Run everything locally with FFmpeg + Whisper, or scale up with cloud APIs.'
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Everything you need to go viral</h2>
          <p className="mt-3 text-slate-700">Fast, accurate, and private by default. Pick local mode for zero-upload processing, or connect APIs when you need scale.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="h-10 w-10 rounded-lg bg-slate-900 text-white grid place-items-center">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
