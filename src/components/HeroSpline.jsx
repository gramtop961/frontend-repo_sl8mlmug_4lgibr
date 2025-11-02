import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { PlayCircle, Upload, AlertCircle } from 'lucide-react';

export default function HeroSpline() {
  const inputRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  const onPick = () => inputRef.current?.click();

  const onFile = (e) => {
    setError('');
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setError('Please select a valid video file.');
      return;
    }
    const maxSize = 1024 * 1024 * 1024; // 1GB
    if (file.size > maxSize) {
      setError('File is too large. Please choose a file under 1GB.');
      return;
    }
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

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
              <button onClick={onPick} className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow hover:opacity-95">
                <Upload className="h-5 w-5" />
                Upload a video
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-slate-300 bg-white text-slate-900 hover:bg-slate-50">
                <PlayCircle className="h-5 w-5" />
                Watch demo
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={onFile}
              />
            </div>
            {error && (
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                <AlertCircle className="h-4 w-4" /> {error}
              </div>
            )}
            <p className="mt-4 text-sm text-slate-600">
              Works offline with local Whisper. No media leaves your computer in local mode.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-xl bg-white/80 backdrop-blur shadow-xl border border-white/60 p-4">
              <div className="aspect-[9/16] rounded-lg bg-slate-900 overflow-hidden">
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    className="h-full w-full object-cover"
                    controls
                    muted
                  />
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white" />
    </section>
  );
}
