import React, { useRef, useState, useEffect } from 'react';
import { Upload, XCircle, Play } from 'lucide-react';

export default function EditorPanel({ onFileLoaded, videoUrl, setVideoUrl, setAudioBuffer }) {
  const inputRef = useRef(null);
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const onPick = () => {
    inputRef.current?.click();
  };

  const reset = () => {
    setVideoUrl('');
    setAudioBuffer(null);
    setFileName('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const onFile = async (e) => {
    setError('');
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('video/')) {
        setError('Please choose a valid video file.');
        return;
      }
      const MAX = 1024 * 1024 * 1024; // 1GB
      if (file.size > MAX) {
        setError('File is too large. Please select a video up to 1GB.');
        return;
      }
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setFileName(`${file.name} • ${(file.size / 1024 / 1024).toFixed(1)} MB`);

      // Decode audio for analysis (silence detection)
      const arrayBuf = await file.arrayBuffer();
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuf.slice(0));
      setAudioBuffer(audioBuffer);

      onFileLoaded?.(file);
    } catch (err) {
      console.error(err);
      setError('Could not load this file. Try a different video.');
    }
  };

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [videoUrl]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Video</h2>
            <p className="text-sm text-muted-foreground">Upload and preview</p>
          </div>
          <div className="flex gap-2">
            <button onClick={onPick} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
              <Upload size={16} /> Upload
            </button>
            {videoUrl && (
              <button onClick={reset} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition">
                <XCircle size={16} /> Reset
              </button>
            )}
          </div>
        </div>
        <input ref={inputRef} type="file" accept="video/*" onChange={onFile} className="hidden" />
        {fileName && <div className="text-sm text-neutral-600 dark:text-neutral-300">{fileName}</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="aspect-[9/16] w-full rounded-xl overflow-hidden border bg-black">
          {videoUrl ? (
            <video ref={videoRef} controls src={videoUrl} className="h-full w-full object-contain bg-black" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-neutral-400">
              <div className="flex flex-col items-center gap-2">
                <Play />
                <span>Choose a video to get started</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
          <li>Click Upload to select a video (up to 1GB).</li>
          <li>We analyze the audio locally to detect pauses and auto-cut.</li>
          <li>Generate subtitles and export them as SRT or export the cut list as JSON.</li>
        </ul>
        <div className="p-4 rounded-lg border text-sm text-neutral-600 dark:text-neutral-300">
          All processing happens in your browser. No files are uploaded to a server.
        </div>
      </div>
    </div>
  );
}
