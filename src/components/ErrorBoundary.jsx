import React from 'react';
import { AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('LearningX UI error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full p-6 rounded-2xl border border-rose-800/40 bg-rose-950/20 space-y-3 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
            <h1 className="text-lg font-semibold text-slate-100">Something went wrong</h1>
            <p className="text-xs text-slate-400 font-mono break-words">
              {this.state.error?.message || 'Unexpected application error'}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-secondary px-4 py-2 rounded-xl text-xs font-semibold text-cyan-400"
            >
              Reload LearningX
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
