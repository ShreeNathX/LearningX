import React, { useState } from 'react';
import { 
  Code2, 
  Flame, 
  CheckCircle2, 
  Bookmark, 
  Download, 
  Upload, 
  Sparkles, 
  HelpCircle,
  Database,
  GitMerge
} from 'lucide-react';
import { exportDataAsJson, importDataFromJson, calculateStreak } from '../services/storage';

export function Navbar({ 
  currentTrack, 
  onSelectTrack, 
  userData, 
  onUserDataUpdate,
  totalQuestions,
  onNavigateHome
}) {
  const [showDataModal, setShowDataModal] = useState(false);
  const [importStatus, setImportStatus] = useState('');

  const solvedCount = Math.min(Object.keys(userData.solved || {}).length, totalQuestions);
  const streak = calculateStreak(userData.streakDates || []);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const ok = importDataFromJson(content);
        if (ok) {
          setImportStatus('Data restored successfully!');
          onUserDataUpdate();
          setTimeout(() => {
            setShowDataModal(false);
            setImportStatus('');
          }, 1200);
        } else {
          setImportStatus('Failed to import: Invalid format.');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={onNavigateHome}
          className="flex min-w-0 items-center gap-2 sm:gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Learning<span className="text-cyan-400">X</span>
              </span>
              <span className="hidden sm:inline text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 -mt-1 hidden sm:block">
              Python • DSA • SQL
            </p>
          </div>
        </div>

        {/* Quick Track Switcher */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/80">
          {[
            { id: 'all', label: 'All', icon: Sparkles },
            { id: 'python', label: 'Python', icon: Code2 },
            { id: 'dsa', label: 'DSA', icon: GitMerge },
            { id: 'sql', label: 'SQL', icon: Database },
          ].map((item) => {
            const Icon = item.icon;
            const active = currentTrack === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTrack(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User Stats & Utilities */}
        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-3">
          
          {/* Daily Streak */}
          <div 
            title={`${streak} day streak`}
            className="hidden min-[390px]:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold"
          >
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>{streak}</span>
            <span className="hidden sm:inline text-amber-300/70 font-normal">days</span>
          </div>

          {/* Solved Progress Counter */}
          <div 
            title={`${solvedCount} out of ${totalQuestions} solved`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{solvedCount}</span>
            <span className="hidden sm:inline text-emerald-300/60 font-normal">/ {totalQuestions}</span>
          </div>

          {/* Backup / Restore Modal Trigger */}
          <button
            onClick={() => setShowDataModal(true)}
            title="Backup & Restore Progress"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Backup / Restore Modal */}
      {showDataModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl space-y-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Download className="w-4 h-4 text-cyan-400" />
                Data Backup & Sync
              </h3>
              <button
                onClick={() => setShowDataModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              LearningX runs 100% locally in your browser. You can export your progress, streak, code history, and notes to a file to sync across devices or backup.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  exportDataAsJson();
                  setShowDataModal(false);
                }}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                Export JSON
              </button>

              <label className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>Import JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {importStatus && (
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs text-center">
                {importStatus}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
