import React from 'react';
import { Rocket, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur bg-white/60 dark:bg-neutral-950/60 border-b">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="text-blue-600" />
          <span className="font-semibold">ClipSmith Studio</span>
        </div>
        <nav className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
          <a href="#" className="hover:text-neutral-900 dark:hover:text-white">Editor</a>
          <a href="#" className="hover:text-neutral-900 dark:hover:text:white hidden sm:inline">Docs</a>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border hover:bg-neutral-50 dark:hover:bg-neutral-900">
            <Settings size={16} /> Settings
          </button>
        </nav>
      </div>
    </header>
  );
}
