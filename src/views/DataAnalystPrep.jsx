import React, { useMemo, useState } from 'react';
import { ArrowLeft, BriefcaseBusiness, Check, ChevronDown, RotateCcw } from 'lucide-react';
import { dataAnalystQuestions } from '../data/dataAnalystQuestions';
import { setAnalystQuestionStatus } from '../services/storage';

const categories = ['All', ...new Set(dataAnalystQuestions.map((question) => question.category))];

export function DataAnalystPrep({ userData, sqlQuestions, onBack, onSelectProblem, onUserDataUpdate }) {
  const [category, setCategory] = useState('All');
  const [reviewOnly, setReviewOnly] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [storageWarning, setStorageWarning] = useState('');
  const status = userData.analystStatus || {};
  const reviewCount = Object.values(status).filter((value) => value === 'review').length;
  const knownCount = Object.values(status).filter((value) => value === 'known').length;
  const totalQuestionCount = dataAnalystQuestions.length + sqlQuestions.length;

  const questions = useMemo(() => dataAnalystQuestions.filter((question) =>
    (category === 'All' || question.category === category) &&
    (!reviewOnly || status[question.id] === 'review')
  ), [category, reviewOnly, status]);

  const updateStatus = (id, nextStatus) => {
    if (!setAnalystQuestionStatus(id, nextStatus)) {
      setStorageWarning('Your review progress could not be saved in this browser.');
      return;
    }
    setStorageWarning('');
    onUserDataUpdate();
  };

  return (
    <section className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 animate-fade-in">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300">
        <ArrowLeft className="w-4 h-4" /> Back to coding practice
      </button>

      <header className="glass-card rounded-2xl border border-slate-800 p-5 sm:p-7 space-y-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-3 text-cyan-300">
            <BriefcaseBusiness className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-cyan-300 font-semibold">Interview practice</p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-white">Data Analyst Interview Prep</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">
              Practice SQL in the built-in editor and test console, then review interview prompts across Excel, statistics, Power BI, Pandas, business cases, and project discussion.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          <Stat label="Total questions" value={totalQuestionCount} />
          <Stat label="Interview prompts" value={dataAnalystQuestions.length} />
          <Stat label="SQL challenges" value={sqlQuestions.length} />
          <Stat label="Know it" value={knownCount} />
          <Stat label="Review again" value={reviewCount} />
        </div>
        <p className="text-xs text-slate-500">Try answering out loud before opening the guide. Mark “Review again” when you need another round.</p>
      </header>

      {storageWarning && <p role="alert" className="text-xs text-amber-200 bg-amber-950/70 border border-amber-800/50 rounded-lg px-3 py-2">{storageWarning}</p>}

      <section className="space-y-3" aria-labelledby="analyst-sql-heading">
        <div>
          <h2 id="analyst-sql-heading" className="text-lg font-semibold text-white">SQL coding practice</h2>
          <p className="mt-1 text-sm text-slate-400">Open an exercise to write SQL, run a quick check, and submit against the full test suite.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sqlQuestions.map((question) => (
            <article key={question.id} className="glass-card rounded-xl border border-slate-800 p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-slate-100">{question.title}</h3>
                <span className={`shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full ${question.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-300' : question.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-300' : 'bg-amber-500/10 text-amber-300'}`}>{question.difficulty}</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400 flex-1">{question.description}</p>
              <button type="button" onClick={() => onSelectProblem(question)} className="self-start px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs font-semibold hover:bg-cyan-500/20">
                Open SQL editor
              </button>
            </article>
          ))}
        </div>
      </section>

      <div className="border-t border-slate-800 pt-5">
        <h2 className="text-lg font-semibold text-white">Concept and scenario questions</h2>
        <p className="mt-1 text-sm text-slate-400">Try answering out loud before opening the answer guide. Mark “Review again” when you want another round.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <label className="sr-only" htmlFor="analyst-category">Filter by topic</label>
        <select id="analyst-category" value={category} onChange={(event) => setCategory(event.target.value)} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200">
          {categories.map((item) => <option key={item} value={item}>{item === 'All' ? 'All interview areas' : item}</option>)}
        </select>
        <button type="button" aria-pressed={reviewOnly} onClick={() => setReviewOnly((current) => !current)} className={`px-3 py-2 rounded-xl border text-sm ${reviewOnly ? 'border-amber-500/40 bg-amber-500/10 text-amber-200' : 'border-slate-800 bg-slate-900 text-slate-300'}`}>
          Review list ({reviewCount})
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="glass-card rounded-2xl border border-slate-800 p-8 text-center space-y-2">
          <Check className="mx-auto w-7 h-7 text-emerald-400" />
          <h2 className="font-semibold text-slate-100">Nothing in your review list</h2>
          <p className="text-sm text-slate-400">Mark a question “Review again” and it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((question, index) => {
            const isOpen = openId === question.id;
            const questionStatus = status[question.id];
            return (
              <article key={question.id} className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
                <button type="button" aria-expanded={isOpen} onClick={() => setOpenId(isOpen ? null : question.id)} className="w-full text-left p-4 sm:p-5 flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center justify-center font-mono">{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] uppercase tracking-wide text-cyan-300">{question.category}</span>
                    <span className="mt-1 block font-semibold text-slate-100">{question.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-400">{question.prompt}</span>
                    {questionStatus && <span className={`mt-2 inline-block text-[11px] ${questionStatus === 'known' ? 'text-emerald-300' : 'text-amber-300'}`}>{questionStatus === 'known' ? 'Marked as known' : 'Marked to review'}</span>}
                  </span>
                  <ChevronDown className={`mt-1 shrink-0 w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pl-14 sm:pl-16 space-y-3">
                    <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3 sm:p-4">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Answer points</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{question.answer}</p>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-400"><span className="font-semibold text-cyan-300">Follow-up:</span> {question.followUp}</p>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => updateStatus(question.id, 'review')} className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200 hover:bg-amber-500/20"><RotateCcw className="w-3.5 h-3.5" /> Review again</button>
                      <button type="button" onClick={() => updateStatus(question.id, 'known')} className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200 hover:bg-emerald-500/20"><Check className="w-3.5 h-3.5" /> Know this</button>
                      {questionStatus && <button type="button" onClick={() => updateStatus(question.id, null)} className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:text-slate-200">Clear status</button>}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }) {
  return <div className="rounded-xl bg-slate-900/80 border border-slate-800 px-3 py-2 text-center">
    <p className="text-lg font-bold text-white">{value}</p>
    <p className="text-[11px] text-slate-400">{label}</p>
  </div>;
}
