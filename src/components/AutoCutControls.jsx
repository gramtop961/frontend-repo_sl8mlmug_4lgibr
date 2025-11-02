import React, { useMemo, useState } from 'react';
import { Scissors } from 'lucide-react';

function detectSegments(audioBuffer, {
  silenceThreshold = 0.02, // normalized 0..1 RMS
  minSilenceMs = 400,
  minSegmentMs = 1000,
} = {}) {
  if (!audioBuffer) return [];
  const sampleRate = audioBuffer.sampleRate;
  const channelData = audioBuffer.numberOfChannels > 1
    ? audioBuffer.getChannelData(0)
    : audioBuffer.getChannelData(0);

  const frameSize = Math.floor(sampleRate * 0.02); // 20ms
  const hopSize = frameSize; // non-overlapping for speed
  const silenceThresholdSq = silenceThreshold * silenceThreshold;
  const minSilenceFrames = Math.ceil((minSilenceMs / 1000) * (sampleRate / hopSize));
  const minSegmentFrames = Math.ceil((minSegmentMs / 1000) * (sampleRate / hopSize));

  function frameRMS(startIndex) {
    let sum = 0;
    let count = 0;
    for (let i = startIndex; i < Math.min(startIndex + frameSize, channelData.length); i++) {
      const s = channelData[i];
      sum += s * s;
      count++;
    }
    return count ? sum / count : 0; // mean square
  }

  // Compute simple frame energies
  const frames = [];
  for (let i = 0; i < channelData.length; i += hopSize) {
    frames.push(frameRMS(i));
  }

  // Find silence runs
  const silence = frames.map(e => e < silenceThresholdSq);
  const cutPoints = [];
  let run = 0;
  for (let i = 0; i < silence.length; i++) {
    run = silence[i] ? run + 1 : 0;
    if (run === minSilenceFrames) {
      cutPoints.push(i - Math.floor(minSilenceFrames / 2));
    }
  }

  // Build segments between cut points
  const segments = [];
  let last = 0;
  const toTime = (frameIndex) => (frameIndex * hopSize) / sampleRate;
  for (const c of cutPoints) {
    const endTime = toTime(c);
    const startTime = toTime(last);
    if ((endTime - startTime) * 1000 >= minSegmentMs) {
      segments.push({ start: startTime, end: endTime });
      last = c;
    }
  }
  const finalEnd = channelData.length / sampleRate;
  if ((finalEnd - toTime(last)) * 1000 >= minSegmentMs) {
    segments.push({ start: toTime(last), end: finalEnd });
  }

  // Ensure segments are increasing and within bounds
  return segments
    .filter(s => s.end > s.start)
    .map((s, idx) => ({ id: idx + 1, ...s }));
}

function toSRT(segments) {
  function fmt(t) {
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = Math.floor(t % 60);
    const ms = Math.floor((t - Math.floor(t)) * 1000);
    const pad = (n, z = 2) => String(n).padStart(z, '0');
    return `${pad(h)}:${pad(m)}:${pad(s) },${pad(ms,3)}`;
  }
  return segments.map((seg, i) => {
    const text = `Segment ${i + 1}`;
    return `${i + 1}\n${fmt(seg.start)} --> ${fmt(seg.end)}\n${text}\n`;
  }).join('\n');
}

export default function AutoCutControls({ audioBuffer, onSegments, segments, onSubtitles }) {
  const [silenceThreshold, setSilenceThreshold] = useState(0.02);
  const [minSilenceMs, setMinSilenceMs] = useState(400);
  const [minSegmentMs, setMinSegmentMs] = useState(1000);

  const canAnalyze = !!audioBuffer;

  const generate = () => {
    const segs = detectSegments(audioBuffer, { silenceThreshold, minSilenceMs, minSegmentMs });
    onSegments(segs);
    onSubtitles(toSRT(segs));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Auto Cut & Subtitles</h2>
          <p className="text-sm text-muted-foreground">Detect pauses and create segments + SRT</p>
        </div>
        <button
          onClick={generate}
          disabled={!canAnalyze}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-md transition ${canAnalyze ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-neutral-200 text-neutral-500'}`}
        >
          <Scissors size={16} /> Generate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm text-neutral-600 dark:text-neutral-300">Silence threshold</label>
          <input type="range" min={0.005} max={0.08} step={0.005} value={silenceThreshold} onChange={e=>setSilenceThreshold(parseFloat(e.target.value))} className="w-full" />
          <div className="text-xs text-neutral-500">{silenceThreshold.toFixed(3)}</div>
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-600 dark:text-neutral-300">Min silence (ms)</label>
          <input type="number" min={100} step={50} value={minSilenceMs} onChange={e=>setMinSilenceMs(parseInt(e.target.value||'0'))} className="w-full rounded-md border bg-transparent px-2 py-1" />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-600 dark:text-neutral-300">Min segment (ms)</label>
          <input type="number" min={200} step={100} value={minSegmentMs} onChange={e=>setMinSegmentMs(parseInt(e.target.value||'0'))} className="w-full rounded-md border bg-transparent px-2 py-1" />
        </div>
      </div>

      {segments && segments.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Segments</div>
          <div className="max-h-48 overflow-auto rounded-lg border divide-y">
            {segments.map((s) => (
              <div key={s.id} className="text-sm px-3 py-2 flex items-center justify-between">
                <div className="font-mono">{s.id.toString().padStart(2,'0')}</div>
                <div className="font-mono text-neutral-600 dark:text-neutral-300">
                  {s.start.toFixed(2)}s → {s.end.toFixed(2)}s
                </div>
                <div className="text-neutral-500">{(s.end - s.start).toFixed(2)}s</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
