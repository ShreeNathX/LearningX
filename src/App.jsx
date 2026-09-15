import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { ProblemList } from './views/ProblemList';
import { loadUserData } from './services/storage';

const ProblemArena = lazy(() =>
  import('./views/ProblemArena.jsx').then((mod) => ({ default: mod.ProblemArena }))
);

export function App() {
  const [currentTrack, setCurrentTrack] = useState('all');
  const [activeProblem, setActiveProblem] = useState(null);
  const [userData, setUserData] = useState(loadUserData());
  const [questions, setQuestions] = useState(null);
  const [catalogError, setCatalogError] = useState(null);

  const refreshUserData = () => {
    setUserData(loadUserData());
  };

  useEffect(() => {
    let cancelled = false;
    import('./data/allQuestions.js')
      .then((mod) => {
        if (!cancelled) {
          setQuestions(mod.allQuestions);
          setCatalogError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setCatalogError(err?.message || String(err));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Sync with URL Hash for seamless GitHub Pages routing (#problem/prog-01)
  useEffect(() => {
    if (!questions) return undefined;

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#problem/')) {
        const problemId = hash.replace('#problem/', '');
        const found = questions.find((q) => q.id === problemId);
        if (found) {
          setActiveProblem(found);
          return;
        }
      }
      setActiveProblem(null);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [questions]);

  const handleSelectProblem = (problem) => {
    window.location.hash = `#problem/${problem.id}`;
    setActiveProblem(problem);
  };

  const handleNavigateHome = () => {
    window.location.hash = '';
    setActiveProblem(null);
  };

  if (catalogError) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-lg w-full p-5 rounded-2xl border border-rose-800/40 bg-rose-950/20 space-y-2">
          <h1 className="text-sm font-semibold text-rose-300">Could not load question catalog</h1>
          <p className="text-xs font-mono text-rose-200/90 break-words">{catalogError}</p>
        </div>
      </div>
    );
  }

  if (!questions) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-3">
        <div className="w-9 h-9 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Loading interview catalog…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Navbar */}
      <Navbar
        currentTrack={currentTrack}
        onSelectTrack={(track) => {
          setCurrentTrack(track);
          if (activeProblem) handleNavigateHome();
        }}
        userData={userData}
        onUserDataUpdate={refreshUserData}
        totalQuestions={questions.length}
        onNavigateHome={handleNavigateHome}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col">
        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm gap-2">
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              Opening workspace…
            </div>
          }
        >
          {activeProblem ? (
            <ProblemArena
              key={activeProblem.id}
              problem={activeProblem}
              allProblems={questions}
              userData={userData}
              onBack={handleNavigateHome}
              onNavigateProblem={handleSelectProblem}
              onUserDataUpdate={refreshUserData}
            />
          ) : (
            <ProblemList
              questions={questions}
              userData={userData}
              onSelectProblem={handleSelectProblem}
              currentTrack={currentTrack}
              onSelectTrack={setCurrentTrack}
              onUserDataUpdate={refreshUserData}
            />
          )}
        </Suspense>
      </main>

      {/* Footer when on Catalog */}
      {!activeProblem && (
        <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
          <p>
            LearningX • Engineered for serious programmers preparing for top tech interviews.
          </p>
          <p className="text-[11px] text-slate-600">
            Client-Side WebAssembly (Pyodide & SQLite) • Zero Server Dependencies • GitHub Pages Ready
          </p>
        </footer>
      )}
    </div>
  );
}

export default App;
