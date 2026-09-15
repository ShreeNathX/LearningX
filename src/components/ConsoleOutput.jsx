import React, { useState } from 'react';
import { CheckCircle, XCircle, Terminal, AlertTriangle, Clock, Database, Eye } from 'lucide-react';
import { SqlTableViewer } from './SqlTableViewer';

export function ConsoleOutput({ 
  result, 
  loading, 
  track, 
  schemaTables,
  activeTab: parentActiveTab,
  onTabChange
}) {
  const [localTab, setLocalTab] = useState('tests');
  const activeTab = parentActiveTab || localTab;
  const setActiveTab = onTabChange || setLocalTab;

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-3">
        <div className="w-7 h-7 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Running code in isolated sandbox...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-2 text-slate-500">
        <Terminal className="w-8 h-8 opacity-40" />
        <p className="text-xs font-mono">Click "Run Code" or press Ctrl+Enter to execute test suite.</p>
      </div>
    );
  }

  const isSql = track === 'sql';
  const hasError = !!result.error;
  const isPassed = isSql ? result.passed : result.allPassed;

  return (
    <div className="h-full flex flex-col bg-slate-950/95 overflow-hidden text-slate-200">
      
      {/* Console Tab Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 text-xs select-none">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'tests'
                ? 'bg-slate-800 text-cyan-400 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isPassed ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            ) : hasError ? (
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Terminal className="w-3.5 h-3.5" />
            )}
            Test Results
          </button>

          <button
            onClick={() => setActiveTab('stdout')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === 'stdout'
                ? 'bg-slate-800 text-cyan-400 font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Stdout / Logs
          </button>

          {isSql && (
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'schema'
                  ? 'bg-slate-800 text-amber-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Database Tables
            </button>
          )}
        </div>

        {/* Execution Time Pill */}
        {result.executionTimeMs !== undefined && (
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{result.executionTimeMs} ms</span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        
        {/* Error Banner */}
        {hasError && (
          <div className="mb-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-200 text-xs font-mono space-y-1.5">
            <div className="flex items-center gap-2 text-rose-400 font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>Runtime / Syntax Error</span>
            </div>
            <pre className="whitespace-pre-wrap overflow-x-auto text-[11px] text-rose-300/90 pl-6">
              {result.error}
            </pre>
          </div>
        )}

        {/* TAB 1: Tests */}
        {activeTab === 'tests' && (
          <div className="space-y-4">
            
            {/* Status Summary */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2">
                {isPassed ? (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    Passed All Test Cases
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    {hasError ? 'Execution Failed' : 'Test Assertions Failed'}
                  </span>
                )}
              </div>

              {result.feedback && (
                <span className="text-xs text-slate-400 font-mono">
                  {result.feedback}
                </span>
              )}
              {result.testScope && (
                <span className="text-[11px] text-cyan-300 font-mono">
                  {result.testScope}
                </span>
              )}
            </div>

            {/* SQL Table Results Diff */}
            {isSql && result.userResult && (
              <div className="space-y-4">
                
                {/* User Result Table */}
                <div className="space-y-1.5">
                  <div className="text-xs font-medium text-slate-300 flex items-center justify-between">
                    <span>Your Query Output:</span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {result.userResult.values.length} rows
                    </span>
                  </div>
                  <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
                    {result.userResult.columns.length > 0 ? (
                      <table className="sql-table">
                        <thead>
                          <tr>
                            {result.userResult.columns.map((c, i) => (
                              <th key={i}>{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {result.userResult.values.map((row, rI) => (
                            <tr key={rI}>
                              {row.map((v, cI) => (
                                <td key={cI}>{v === null ? 'NULL' : String(v)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-4 text-center text-slate-500 text-xs font-mono">
                        Query returned 0 columns or empty set.
                      </div>
                    )}
                  </div>
                </div>

                {/* Expected Result Table */}
                {result.expectedResult && (
                  <div className="space-y-1.5">
                    <div className="text-xs font-medium text-slate-400 flex items-center justify-between">
                      <span>Expected Output:</span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {result.expectedResult.values.length} rows
                      </span>
                    </div>
                    <div className="border border-slate-800/60 rounded-xl overflow-hidden bg-slate-900/30 opacity-90">
                      <table className="sql-table">
                        <thead>
                          <tr>
                            {result.expectedResult.columns.map((c, i) => (
                              <th key={i} className="text-slate-400">{c}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {result.expectedResult.values.map((row, rI) => (
                            <tr key={rI}>
                              {row.map((v, cI) => (
                                <td key={cI}>{v === null ? 'NULL' : String(v)}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Python test case cards */}
            {!isSql && result.results && result.results.length > 0 && (
              <div className="space-y-2.5">
                {result.results.map((tc, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs font-mono space-y-2 transition-colors ${
                      tc.passed
                        ? 'bg-emerald-950/20 border-emerald-800/30'
                        : 'bg-rose-950/20 border-rose-800/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">
                        Case {tc.testIndex || idx + 1}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          tc.passed
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {tc.passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                      {tc.input !== undefined && (
                        <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                          <span className="text-slate-500 block text-[10px] uppercase font-sans">
                            Input:
                          </span>
                          <span className="text-slate-200 break-all">
                            {JSON.stringify(tc.input)}
                          </span>
                        </div>
                      )}

                      <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                        <span className="text-slate-500 block text-[10px] uppercase font-sans">
                          Expected:
                        </span>
                        <span className="text-emerald-400 break-all">
                          {JSON.stringify(tc.expected)}
                        </span>
                      </div>

                      <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 sm:col-span-2">
                        <span className="text-slate-500 block text-[10px] uppercase font-sans">
                          Your Output:
                        </span>
                        <span
                          className={`break-all ${
                            tc.passed ? 'text-slate-200' : 'text-rose-400 font-bold'
                          }`}
                        >
                          {tc.actual !== undefined
                            ? JSON.stringify(tc.actual)
                            : tc.error || 'None'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Stdout */}
        {activeTab === 'stdout' && (
          <div className="h-full">
            {result.stdout && result.stdout.trim() ? (
              <pre className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 whitespace-pre-wrap">
                {result.stdout}
              </pre>
            ) : (
              <div className="p-6 text-center text-slate-500 text-xs font-mono">
                No standard output was printed.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SQL Schema Tables */}
        {activeTab === 'schema' && isSql && (
          <SqlTableViewer tables={schemaTables} />
        )}
      </div>
    </div>
  );
}
