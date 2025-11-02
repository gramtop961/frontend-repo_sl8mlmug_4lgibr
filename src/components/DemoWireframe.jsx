import React, { useRef, useState } from 'react';
import { Upload, Scissors, Download, PlayCircle, AlertCircle, Text } from 'lucide-react';

const Card = ({ icon: Icon, title, children, badge }) => (
  <div className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    {badge && (
      <span className="absolute -top-3 left-4 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-fuchsia-600 text-white shadow">
        {badge}
      </span>
    )}
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-md bg-slate-900 text-white grid place-items-center">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="text-slate-900 font-semibold">{title}</h4>
    </div>
    <div className="mt-4">{children}</div>
  </div>
);

export default function DemoWireframe() {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');
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
    setFileName(`${file.name} • ${(file.size / (1024 * 1024)).toFixed(1)} MB`);
  };

  return (
    <section id="demo" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Try the minimal demo flow</h2>
          <p className="mt-3 text-slate-700">A guided wireframe shows the core steps your users will take. Great for user testing before wiring the backend.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card icon={Upload} title="1. Uploader" badge="Step 1">
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center">
              <p className="text-sm text-slate-600">Drag & drop a file or paste a YouTube URL</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <button onClick={onPick} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white">
                  <Upload className="h-4 w-4" /> Choose file
                </button>
                <input ref={inputRef} type="file" accept="video/*" className="hidden" onChange={onFile} />
              </div>
              {fileName && (
                <p className="mt-3 text-sm text-slate-700">Selected: {fileName}</p>
              )}
              {error && (
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                  <AlertCircle className="h-4 w-4" /> {error}
                </div>
              )}
            </div>
          </Card>

          <Card icon={Scissors} title="2. Timeline & auto-cuts" badge="Step 2">
            <div className="space-y-3">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-fuchsia-500 to-blue-500" />
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>00:00</span><span>03:00</span>
              </div>
              <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 bg-white">
                <PlayCircle className="h-4 w-4" /> Preview cut
              </button>
            </div>
          </Card>

          <Card icon={Text} title="3. Subtitle editor" badge="Step 3">
            <div className="space-y-3">
              <div className="rounded-md bg-slate-50 p-3 border border-slate-200">
                <p className="text-sm text-slate-800">[00:15 - 00:21] This is a sample line for the subtitle editor.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded-md bg-slate-900 text-white text-sm">Auto-translate</button>
                <button className="px-3 py-2 rounded-md border border-slate-300 bg-white text-sm">Style</button>
              </div>
            </div>
          </Card>

          <Card icon={Download} title="4. Export" badge="Step 4">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {['TikTok 9:16', 'Reels 9:16', 'Shorts 9:16'].map((p) => (
                  <div key={p} className="rounded-md border border-slate-200 p-2 text-center text-xs text-slate-700">{p}</div>
                ))}
              </div>
              <button className="w-full px-4 py-2 rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white">Export clip</button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
