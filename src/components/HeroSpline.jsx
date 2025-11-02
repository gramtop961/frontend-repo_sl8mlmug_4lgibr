import React from 'react';
import Spline from '@splinetool/react-spline';
import { PlayCircle, Upload } from 'lucide-react';

export default function HeroSpline() {
  return (
    <section className="relative w-full min-h-[78vh] flex items-center">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 py-20">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
              Turn long videos into viral shorts — automatically
            </h1>
            <p className="mt-5 text-lg text-slate-700 max-w-2xl">
              Detect highlights, auto-generate multilingual subtitles, format for 9:16, and export-ready clips for TikTok, Reels, and Shorts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow hover:opacity-95">
                <Upload className="h-5 w-5" />
                Upload a video
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-slate-300 bg-white text-slate-900 hover:bg-slate-50">
                <PlayCircle className="h-5 w-5" />
                Watch demo
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Works offline with local Whisper. No media leaves your computer in local mode.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-xl bg-white/80 backdrop-blur shadow-xl border border-white/60 p-4">
              <div className="aspect-[9/16] rounded-lg bg-slate-900 overflow-hidden">
                <div className="relative h-full w-full grid place-items-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="text-center px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-fuchsia-600/20 text-fuchsia-700 ring-1 ring-inset ring-fuchsia-600/30">
                      9:16 Preview
                    </span>
                    <h3 className="mt-4 text-white text-xl font-semibold">Your clip will appear here</h3>
                    <p className="mt-2 text-white/80 text-sm">Subtitle burn-in, safe margins, brand watermark</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white" />
    </section>
  );
}
