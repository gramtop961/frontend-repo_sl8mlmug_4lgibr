import React from 'react';
import { Rocket, Github, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-gradient-to-br from-fuchsia-500 to-blue-500 text-white shadow">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="font-semibold text-slate-900 text-lg">Viral Shorts Maker</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          <a href="#features" className="hover:text-slate-900 transition">Features</a>
          <a href="#demo" className="hover:text-slate-900 transition">Demo</a>
          <a href="#roadmap" className="hover:text-slate-900 transition">Roadmap</a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
            title="Settings"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Settings</span>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
