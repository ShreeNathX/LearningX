import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Send, 
  RotateCcw, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  BookOpen, 
  Lightbulb, 
  CheckCircle2, 
  FileText, 
  Eye, 
  EyeOff,
  Copy,
  Check,
  Code2,
  Database
} from 'lucide-react';
import { ConsoleOutput } from '../components/ConsoleOutput';
import { SplitPane } from '../components/SplitPane';
import { runPythonCode } from '../services/pyodideRunner';
import { executeSqlQuery, getTablesData } from '../services/sqlRunner';
import { 
  markProblemSolved, 
  toggleStarProblem, 
  saveCode, 
  getSavedCode, 
  saveNote, 
  getNote 
} from '../services/storage';
import { validatePythonIndentation } from '../utils/pythonIndentValidator';
import {
  attachPythonIndentValidation,
  applyPythonIndentMarkers,
  clearPythonIndentMarkers
} from '../utils/monacoPythonValidation';

export function ProblemArena({
  problem,
  allProblems,
  userData,
  onBack,
  onNavigateProblem,
  onUserDataUpdate
}) {
  const isSql = problem.track === 'sql';

  // Active language: 'python' | 'sql'
  const [activeLanguage, setActiveLanguage] = useState(
    isSql ? 'sql' : 'python'
  );

  // Editor code state
  const [code, setCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('desc'); // 'desc' | 'hints' | 'solution' | 'notes'
  const [showSolution, setShowSolution] = useState(false);
  const [userNote, setUserNote] = useState('');
  const [copiedSolution, setCopiedSolution] = useState(false);
  const [schemaTables, setSchemaTables] = useState([]);
  const [consoleTab, setConsoleTab] = useState('tests');

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const indentValidationDisposeRef = useRef(null);

  // Current problem indexing
  const currentIndex = allProblems.findIndex((p) => p.id === problem.id);
  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  const isSolved = !!userData.solved?.[problem.id];
  const isStarred = (userData.starred || []).includes(problem.id);

  // The starter template is the contract for each problem. Supplying its
  // entry point lets runners accept helpers and LeetCode-style Solution
  // classes without guessing which callable to execute.
  const getEntryPoint = () => {
    const template = problem.starterCode?.python || '';
    return template.match(/^\s*def\s+([A-Za-z_]\w*)\s*\(/m)?.[1] || '';
  };

  // Initialize or restore code & notes when problem or language changes
  useEffect(() => {
    const lang = isSql ? 'sql' : activeLanguage;
    const saved = getSavedCode(problem.id, lang);
    if (saved) {
      setCode(saved);
    } else {
      if (isSql) {
        setCode(problem.starterCode || '');
      } else {
        setCode(problem.starterCode?.[lang] || problem.starterCode?.python || '');
      }
    }

    // Load saved note
    setUserNote(getNote(problem.id));
    setExecutionResult(null);
    setShowSolution(false);

    // If SQL, preload schema tables
    if (isSql && problem.schemaSql) {
      getTablesData(problem.schemaSql)
        .then(setSchemaTables)
        .catch((err) => {
          console.warn('Failed to preload SQL schema tables:', err);
          setSchemaTables([]);
        });
    } else {
      setSchemaTables([]);
    }
  }, [problem.id, activeLanguage, isSql]);

  const setupPythonIndentValidation = () => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    if (indentValidationDisposeRef.current) {
      indentValidationDisposeRef.current();
      indentValidationDisposeRef.current = null;
    }

    if (!isSql && activeLanguage === 'python') {
      indentValidationDisposeRef.current = attachPythonIndentValidation(editor, monaco, 4);
    } else {
      const model = editor.getModel();
      if (model) clearPythonIndentMarkers(monaco, model);
    }
  };

  useEffect(() => {
    if (!editorRef.current || !monacoRef.current) return undefined;
    setupPythonIndentValidation();
    return () => {
      if (indentValidationDisposeRef.current) {
        indentValidationDisposeRef.current();
        indentValidationDisposeRef.current = null;
      }
    };
  }, [activeLanguage, isSql, problem.id]);

  const handleCodeChange = (newVal) => {
    const val = newVal || '';
    setCode(val);
    saveCode(problem.id, isSql ? 'sql' : activeLanguage, val);
  };

  const handleResetCode = () => {
    if (window.confirm('Reset code to default starter template?')) {
      const defaultCode = isSql
        ? problem.starterCode || ''
        : problem.starterCode?.[activeLanguage] || problem.starterCode?.python || '';
      setCode(defaultCode);
      saveCode(problem.id, isSql ? 'sql' : activeLanguage, defaultCode);
    }
  };

  const handleNoteChange = (e) => {
    const val = e.target.value;
    setUserNote(val);
    saveNote(problem.id, val);
  };

  // Run or Submit Code
  const executeCode = async (isSubmit = false) => {
    if (isRunning) return;

    if (!isSql && activeLanguage === 'python') {
      const indentIssues = validatePythonIndentation(code, 4);
      if (indentIssues.length > 0) {
        setConsoleTab('tests');
        const editor = editorRef.current;
        const monaco = monacoRef.current;
        if (editor && monaco) {
          applyPythonIndentMarkers(monaco, editor.getModel(), code, 4);
        }
        setExecutionResult({
          success: false,
          allPassed: false,
          results: [],
          stdout: '',
          error: indentIssues[0].message
        });
        return;
      }
    }

    setIsRunning(true);
    setConsoleTab('tests');

    try {
      let res;
      if (isSql) {
        res = await executeSqlQuery(code, problem.schemaSql, problem.expectedQuery);
        res.testScope = 'Full SQL check';
      } else {
        // Run provides fast feedback; Submit verifies every stored case.
        const allTests = problem.testCases || [];
        const testsToRun = isSubmit ? allTests : allTests.slice(0, Math.min(2, allTests.length));
        res = await runPythonCode(code, testsToRun, getEntryPoint());
        res.testScope = isSubmit ? 'Full suite' : `Quick check: ${testsToRun.length} case${testsToRun.length === 1 ? '' : 's'}`;
      }

      setExecutionResult(res);

      const passed = isSql ? res.passed : res.allPassed;

      if (passed && isSubmit) {
        // Mark solved & trigger confetti
        markProblemSolved(problem.id, activeLanguage);
        onUserDataUpdate();
        triggerConfetti();
      }
    } catch (err) {
      setExecutionResult({
        success: false,
        allPassed: false,
        results: [],
        stdout: '',
        error: err.message || String(err)
      });
    } finally {
      setIsRunning(false);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Keyboard shortcut Ctrl+Enter to run
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        executeCode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, activeLanguage, isSql, problem]);

  const copySolutionText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedSolution(true);
    setTimeout(() => setCopiedSolution(false), 2000);
  };

  // Editor options
  const editorLanguage = isSql ? 'sql' : 'python';

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-950 overflow-hidden select-none">
      
      {/* Top Problem Sub-bar */}
      <div className="h-12 px-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3 flex-shrink-0">
        
        {/* Left: Back & Problem Nav */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Back to Catalog"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-mono">
              #{problem.id}
            </span>
            <h2 className="text-sm font-bold text-slate-100 truncate max-w-xs sm:max-w-md">
              {problem.title}
            </h2>

            {/* Status */}
            {isSolved && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Solved
              </span>
            )}

            {/* Difficulty */}
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                problem.difficulty === 'Easy'
                  ? 'badge-emerald'
                  : 'badge-amber'
              }`}
            >
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Right: Prev / Next & Bookmark */}
        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => {
              toggleStarProblem(problem.id);
              onUserDataUpdate();
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              isStarred
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title={isStarred ? 'Bookmarked' : 'Bookmark Problem'}
          >
            <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Prev Problem */}
          <button
            onClick={() => prevProblem && onNavigateProblem(prevProblem)}
            disabled={!prevProblem}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous Problem"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Problem */}
          <button
            onClick={() => nextProblem && onNavigateProblem(nextProblem)}
            disabled={!nextProblem}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Next Problem"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Split Body */}
      <div className="flex-1 overflow-hidden">
        <SplitPane
          direction="horizontal"
          defaultSplit={42}
          minSplit={25}
          maxSplit={65}
          left={
            /* LEFT PANE: Description, Hints, Solution, Notes */
            <div className="h-full flex flex-col bg-slate-900/60 border-r border-slate-800 text-slate-200 overflow-hidden select-text">
              
              {/* Tab Navigation */}
              <div className="flex items-center gap-1 p-2 bg-slate-900/90 border-b border-slate-800 text-xs select-none">
                <button
                  onClick={() => setActiveLeftTab('desc')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
                    activeLeftTab === 'desc'
                      ? 'bg-slate-800 text-cyan-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Description
                </button>

                <button
                  onClick={() => setActiveLeftTab('hints')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
                    activeLeftTab === 'hints'
                      ? 'bg-slate-800 text-amber-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Hints ({problem.hints?.length || 0})
                </button>

                <button
                  onClick={() => setActiveLeftTab('solution')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
                    activeLeftTab === 'solution'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Solution
                </button>

                <button
                  onClick={() => setActiveLeftTab('notes')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
                    activeLeftTab === 'notes'
                      ? 'bg-slate-800 text-purple-400'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Notes
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                
                {/* 1. DESCRIPTION TAB */}
                {activeLeftTab === 'desc' && (
                  <div className="space-y-6">
                    {/* Statement */}
                    <div className="space-y-2">
                      <p className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                        {problem.description}
                      </p>
                    </div>

                    {/* SQL Schema Overview if SQL */}
                    {isSql && problem.schemaSql && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                            Database Schema (SQLite)
                          </span>
                          <button
                            onClick={() => {
                              // switch console to schema
                              setConsoleTab('schema');
                            }}
                            className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <Database className="w-3 h-3" /> View Initial Records
                          </button>
                        </div>
                        <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300/90 overflow-x-auto whitespace-pre-wrap">
                          {problem.schemaSql.trim()}
                        </pre>
                      </div>
                    )}

                    {/* Examples */}
                    {problem.examples && problem.examples.length > 0 && (
                      <div className="space-y-3">
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Examples
                        </span>
                        {problem.examples.map((ex, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-2 text-xs font-mono"
                          >
                            <div>
                              <span className="text-slate-500 font-sans block text-[10px] uppercase font-semibold">
                                Input:
                              </span>
                              <span className="text-slate-200 whitespace-pre-wrap">{ex.input}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 font-sans block text-[10px] uppercase font-semibold">
                                Output:
                              </span>
                              <span className="text-emerald-400 whitespace-pre-wrap">{ex.output}</span>
                            </div>
                            {ex.explanation && (
                              <div>
                                <span className="text-slate-500 font-sans block text-[10px] uppercase font-semibold">
                                  Explanation:
                                </span>
                                <span className="text-slate-400 font-sans text-xs">{ex.explanation}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Constraints */}
                    {problem.constraints && problem.constraints.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Constraints
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 font-mono">
                          {problem.constraints.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. HINTS TAB */}
                {activeLeftTab === 'hints' && (
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Hints & Guided Steps
                    </span>
                    {problem.hints && problem.hints.length > 0 ? (
                      problem.hints.map((hint, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/30 text-xs text-amber-200/90 leading-relaxed space-y-1"
                        >
                          <span className="font-semibold text-amber-400 block">
                            Hint {idx + 1}
                          </span>
                          <p>{hint}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 italic">No hints available for this problem.</p>
                    )}
                  </div>
                )}

                {/* 3. SOLUTION TAB */}
                {activeLeftTab === 'solution' && (
                  <div className="space-y-4">
                    {!showSolution ? (
                      <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3">
                        <EyeOff className="w-8 h-8 text-slate-500 mx-auto" />
                        <h4 className="text-sm font-semibold text-slate-200">
                          Official Solution Hidden
                        </h4>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto">
                          We recommend attempting the problem for at least 15 minutes before viewing the solution.
                        </p>
                        <button
                          onClick={() => setShowSolution(true)}
                          className="btn-secondary px-4 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 text-cyan-400"
                        >
                          <Eye className="w-4 h-4" />
                          Reveal Official Solution
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-fade-in">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                            Reference Solution
                          </span>
                          <button
                            onClick={() => setShowSolution(false)}
                            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                          >
                            <EyeOff className="w-3.5 h-3.5" /> Hide
                          </button>
                        </div>

                        {/* Solution code */}
                        <div className="relative border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                          <button
                            onClick={() => {
                              const solText = isSql 
                                ? problem.solution 
                                : problem.solution?.[activeLanguage] || problem.solution?.python || '';
                              copySolutionText(solText);
                            }}
                            className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-800 text-slate-300 hover:text-white text-xs flex items-center gap-1 z-10"
                            title="Copy Solution"
                          >
                            {copiedSolution ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>

                          <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                            {isSql
                              ? problem.solution
                              : problem.solution?.python || 'Solution available in Python.'}
                          </pre>
                        </div>

                        {/* Solution Explanation */}
                        {problem.solution?.explanation && (
                          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                            <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                              Complexity & Approach:
                            </span>
                            <p>{problem.solution.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 4. NOTES TAB */}
                {activeLeftTab === 'notes' && (
                  <div className="space-y-3 h-full flex flex-col">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Personal Notes (Auto-saved)
                    </span>
                    <textarea
                      value={userNote}
                      onChange={handleNoteChange}
                      placeholder="Write your key takeaways, edge cases, time/space complexity notes here..."
                      className="flex-1 min-h-[220px] w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono resize-none leading-relaxed"
                    />
                  </div>
                )}

              </div>
            </div>
          }
          right={
            /* RIGHT PANE: Code Editor & Console */
            <SplitPane
              direction="vertical"
              defaultSplit={62}
              minSplit={30}
              maxSplit={85}
              left={
                /* Editor Panel */
                <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
                  
                  {/* Editor Top Bar */}
                  <div className="h-10 px-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2 flex-shrink-0 select-none">
                    
                    {/* Language Selector */}
                    <div className="flex items-center gap-1">
                      {isSql ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-amber-400 text-xs font-semibold font-mono">
                          <Database className="w-3.5 h-3.5" />
                          <span>SQLite WASM</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 text-cyan-400 text-xs font-semibold">
                          <Code2 className="w-3.5 h-3.5" />
                          Python 3
                        </div>
                      )}
                    </div>

                    {/* Action Buttons: Reset, Run, Submit */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleResetCode}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                        title="Reset to Starter Template"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      {/* Run Code (Ctrl+Enter) */}
                      <button
                        onClick={() => executeCode(false)}
                        disabled={isRunning}
                        className="btn-secondary px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
                        title="Run the first two public test cases (Ctrl + Enter)"
                      >
                        <Play className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                        <span>Run</span>
                        <span className="hidden sm:inline text-[10px] text-slate-500 font-mono">^↵</span>
                      </button>

                      {/* Submit Solution */}
                      <button
                        onClick={() => executeCode(true)}
                        disabled={isRunning}
                        className="btn-success px-3.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
                        title="Verify against the full public test suite and mark solved"
                      >
                        <Send className="w-3 h-3" />
                        <span>Submit</span>
                      </button>
                    </div>

                  </div>

                  {/* Monaco Editor Container */}
                  <div className="flex-1 overflow-hidden">
                    <Editor
                      key={`${problem.id}-${editorLanguage}`}
                      height="100%"
                      language={editorLanguage}
                      value={code}
                      onChange={handleCodeChange}
                      theme="vs-dark"
                      loading={
                        <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                          Loading editor…
                        </div>
                      }
                      onMount={(editor, monaco) => {
                        editorRef.current = editor;
                        monacoRef.current = monaco;
                        setupPythonIndentValidation();
                      }}
                      options={{
                        fontSize: 13,
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 4,
                        insertSpaces: true,
                        detectIndentation: true,
                        wordWrap: 'on',
                        lineNumbers: 'on',
                        padding: { top: 12, bottom: 12 },
                        renderLineHighlight: 'all',
                        renderValidationDecorations: 'on',
                        smoothScrolling: true,
                        bracketPairColorization: { enabled: true }
                      }}
                    />
                  </div>

                </div>
              }
              right={
                /* Bottom Results Console */
                <ConsoleOutput
                  result={executionResult}
                  loading={isRunning}
                  track={problem.track}
                  schemaTables={schemaTables}
                  activeTab={consoleTab}
                  onTabChange={setConsoleTab}
                />
              }
            />
          }
        />
      </div>

    </div>
  );
}

export default ProblemArena;
