import React from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSpline from './components/HeroSpline.jsx';
import FeatureGrid from './components/FeatureGrid.jsx';
import DemoWireframe from './components/DemoWireframe.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSpline />
        <FeatureGrid />
        <DemoWireframe />
        <section id="roadmap" className="py-16 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900">Roadmap</h3>
            <p className="mt-3 text-slate-700 max-w-2xl mx-auto">
              MVP includes auto-cut suggestions, transcription with local Whisper, a subtitle editor, and 9:16 export. Next milestones: OAuth uploads, cloud queues, and collaborative editing.
            </p>
          </div>
        </section>
      </main>
      <footer className="py-10 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">© {new Date().getFullYear()} Viral Shorts Maker. All rights reserved.</p>
          <div className="text-sm text-slate-600">Privacy-first • Local processing available</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
