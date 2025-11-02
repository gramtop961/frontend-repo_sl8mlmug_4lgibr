import React, { useMemo } from 'react';
import { Download, FileText } from 'lucide-react';

function srtFromSegments(segments) {
  function fmt(t) {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = Math.floor(t % 60);
    const ms = Math.floor((t - Math.floor(t)) * 1000);
    const pad = (n, z = 2) => String(n).padStart(z, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
  }
  return (segments || []).map((seg, i) => {
    const text = `Segment ${i + 1}`;
    return `${i + 1}\n${fmt(seg.start)} --> ${fmt(seg.end)}\n${text}\n`;
  }).join('\n');
}

export default function ExportPanel({ segments, subtitles, onSubtitlesChange }) {
  const srt = useMemo(() => subtitles || srtFromSegments(segments), [subtitles, segments]);

  const download = (blob, filename) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const downloadSRT = () => {
    const blob = new Blob([srt || ''], { type: 'text/plain;charset=utf-8' });
    download(blob, 'subtitles.srt');
  };

  const downloadCuts = () => {
    const blob = new Blob([JSON.stringify(segments || [], null, 2)], { type: 'application/json' });
    download(blob, 'cuts.json');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Export</h2>
          <p className="text-sm text-muted-foreground">Save subtitles (SRT) and cut list (JSON)</p>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadSRT} disabled={!srt}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md transition ${srt ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-neutral-200 text-neutral-500'}`}>
            <FileText size={16} /> Subtitles
          </button>
          <button onClick={downloadCuts} disabled={!segments || segments.length === 0}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md transition ${(segments && segments.length) ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-neutral-200 text-neutral-500'}`}>
            <Download size={16} /> Cuts
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-neutral-600 dark:text-neutral-300">Subtitles (editable)</label>
        <textarea
          value={srt || ''}
          onChange={(e)=>onSubtitlesChange(e.target.value)}
          className="w-full h-48 rounded-lg border p-3 font-mono text-sm bg-transparent"
        />
      </div>
    </div>
  );
}
