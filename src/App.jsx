import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import EditorPanel from './components/EditorPanel.jsx';
import AutoCutControls from './components/AutoCutControls.jsx';
import ExportPanel from './components/ExportPanel.jsx';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [segments, setSegments] = useState([]);
  const [subtitles, setSubtitles] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white">
      <Navbar />

      <main className="flex-1">
        <section className="py-10">
          <div className="max-w-6xl mx-auto px-4 space-y-10">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">All-in-one Shortform Editor</h1>
              <p className="text-neutral-600 dark:text-neutral-300">Upload a video, auto-cut on silence, generate basic subtitles, and export everything from one place.</p>
            </div>

            <EditorPanel
              onFileLoaded={() => {}}
              videoUrl={videoUrl}
              setVideoUrl={setVideoUrl}
              setAudioBuffer={setAudioBuffer}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AutoCutControls
                audioBuffer={audioBuffer}
                onSegments={setSegments}
                segments={segments}
                onSubtitles={setSubtitles}
              />

              <ExportPanel
                segments={segments}
                subtitles={subtitles}
                onSubtitlesChange={setSubtitles}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-neutral-200/60 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} ClipSmith Studio</p>
          <div>Private by default • All processing runs in your browser</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
