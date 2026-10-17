import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  Star, 
  Sparkles, 
  Shuffle, 
  BookOpen, 
  ChevronRight,
  Code2,
  BriefcaseBusiness,
} from 'lucide-react';
import { TRACKS, DIFFICULTIES, TOPIC_TAGS } from '../data/categories';
import { toggleStarProblem } from '../services/storage';
import { DataAnalystPrep } from './DataAnalystPrep';

// A compact rotation of common interview patterns already covered by the catalog.
const CORE_INTERVIEW_IDS = new Set([
  'prog-02', 'prog-07', 'prog-08', 'prog-11', 'prog-12', 'prog-13', 'prog-16', 'prog-17', 'prog-19', 'prog-20', 'prog-37', 'prog-40', 'prog-48', 'prog-49', 'prog-75',
  'dsa-01', 'dsa-02', 'dsa-03', 'dsa-04', 'dsa-05', 'dsa-06', 'dsa-07', 'dsa-08', 'dsa-11', 'dsa-13', 'dsa-16', 'dsa-18', 'dsa-20', 'dsa-21', 'dsa-23', 'dsa-27', 'dsa-29', 'dsa-30', 'dsa-31', 'dsa-33', 'dsa-34', 'dsa-37', 'dsa-38', 'dsa-41', 'dsa-43', 'dsa-56', 'dsa-57', 'dsa-58',
  'sql-01', 'sql-02', 'sql-03', 'sql-04', 'sql-05', 'sql-07', 'sql-13', 'sql-15', 'sql-17', 'sql-20', 'sql-21', 'sql-28', 'sql-30', 'sql-33', 'sql-35', 'sql-54', 'sql-55'
]);

export function ProblemList({ 
  questions, 
  userData, 
  onSelectProblem, 
  currentTrack, 
  onSelectTrack,
  onUserDataUpdate 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [filterSolved, setFilterSolved] = useState('all'); // 'all' | 'solved' | 'unsolved'
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [coreOnly, setCoreOnly] = useState(false);
  const [storageWarning, setStorageWarning] = useState('');
  const [showAnalystPrep, setShowAnalystPrep] = useState(false);

  const solvedSet = useMemo(() => {
    const availableIds = new Set(questions.map((question) => question.id));
    return new Set(Object.keys(userData.solved || {}).filter((id) => availableIds.has(id)));
  }, [questions, userData.solved]);
  const starredSet = useMemo(() => new Set(userData.starred || []), [userData.starred]);

  // Filter the catalog before rendering it.
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Track filter
      if (currentTrack !== 'all' && q.track !== currentTrack) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
        return false;
      }

      // Topic filter
      if (selectedTopic !== 'All' && q.topic !== selectedTopic) {
        return false;
      }

      // Solved status filter
      const isSolved = solvedSet.has(q.id);
      if (filterSolved === 'solved' && !isSolved) return false;
      if (filterSolved === 'unsolved' && isSolved) return false;

      // Starred filter
      if (showStarredOnly && !starredSet.has(q.id)) return false;
      if (coreOnly && !CORE_INTERVIEW_IDS.has(q.id)) return false;

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchTopic = (q.topic || '').toLowerCase().includes(query);
        const matchDesc = (q.description || '').toLowerCase().includes(query);
        if (!matchTitle && !matchTopic && !matchDesc) return false;
      }

      return true;
    });
  }, [
    questions, 
    currentTrack, 
    selectedDifficulty, 
    selectedTopic, 
    filterSolved, 
    showStarredOnly, 
    searchQuery, 
    coreOnly,
    solvedSet, 
    starredSet
  ]);

  const handleStarClick = (e, problemId) => {
    e.stopPropagation();
    if (!toggleStarProblem(problemId)) {
      setStorageWarning('Your bookmark could not be saved in this browser.');
    } else {
      setStorageWarning('');
    }
    onUserDataUpdate();
  };

  const pickRandomProblem = () => {
    if (filteredQuestions.length === 0) return;
    const essentials = filteredQuestions.filter((question) => CORE_INTERVIEW_IDS.has(question.id));
    const candidates = essentials.length ? essentials : filteredQuestions;
    const unsolved = candidates.filter((question) => !solvedSet.has(question.id));
    const pool = unsolved.length ? unsolved : candidates;
    onSelectProblem(pool[Math.floor(Math.random() * pool.length)]);
  };

  // Stats calculation
  const totalCount = questions.length;
  const solvedCount = solvedSet.size;
  const easyCount = questions.filter(q => q.difficulty === 'Easy').length;
  const mediumCount = questions.filter(q => q.difficulty === 'Medium').length;
  const hardCount = questions.filter(q => q.difficulty === 'Hard').length;
  const solvedEasy = questions.filter(q => q.difficulty === 'Easy' && solvedSet.has(q.id)).length;
  const solvedMedium = questions.filter(q => q.difficulty === 'Medium' && solvedSet.has(q.id)).length;
  const solvedHard = questions.filter(q => q.difficulty === 'Hard' && solvedSet.has(q.id)).length;
  const remainingCount = Math.max(0, totalCount - solvedCount);

  if (showAnalystPrep) {
    return <DataAnalystPrep
      userData={userData}
      sqlQuestions={questions.filter((question) => question.analystPrep)}
      onBack={() => setShowAnalystPrep(false)}
      onSelectProblem={onSelectProblem}
      onUserDataUpdate={onUserDataUpdate}
    />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8 animate-fade-in">
      {storageWarning && <p role="alert" className="text-xs text-amber-200 bg-amber-950/70 border border-amber-800/50 rounded-lg px-3 py-2">{storageWarning}</p>}
      
      {/* Hero Overview & Progress Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Banner Card */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-5 sm:p-8 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Job-Ready Interview Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Master Modern Programming, Algorithms & SQL
            </h1>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Curated interview challenges with browser execution, instant test evaluation, and offline storage.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={pickRandomProblem}
                className="btn-primary w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Practice an Essential
              </button>
              <button
                onClick={() => setShowAnalystPrep(true)}
                className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/15 text-xs font-semibold flex items-center gap-2"
              >
                <BriefcaseBusiness className="w-4 h-4" />
                Data Analyst Interview Prep
              </button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
            <Code2 className="w-64 h-64 text-cyan-400" />
          </div>
        </div>

        {/* Stats Progress Card */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">
              Preparation Progress
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-white">
                {Math.round((solvedCount / (totalCount || 1)) * 100)}%
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {solvedCount} / {totalCount} completed
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 mt-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(solvedCount / (totalCount || 1)) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              {remainingCount === 0
                ? 'Curriculum complete. Revisit starred problems and practise timed mock interviews.'
                : `${remainingCount} challenges remain. Complete every track to finish the interview-practice curriculum.`}
            </p>
          </div>

          {/* Breakdown by difficulty */}
          <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-400 font-medium">Easy</span>
                <span className="text-slate-400 font-mono">{solvedEasy} / {easyCount}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(solvedEasy / (easyCount || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-400 font-medium">Medium</span>
                <span className="text-slate-400 font-mono">{solvedMedium} / {mediumCount}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${(solvedMedium / (mediumCount || 1)) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-rose-400 font-medium">Hard</span>
                <span className="text-slate-400 font-mono">{solvedHard} / {hardCount}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: `${(solvedHard / (hardCount || 1)) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        
        {/* Track Pills */}
        <div className="flex items-center gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 scrollbar-none">
          {TRACKS.map((t) => {
            const active = currentTrack === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTrack(t.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  active
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <span>{t.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  active ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {t.id === 'all' 
                    ? questions.length 
                    : questions.filter(q => q.track === t.id).length
                  }
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Controls */}
        <div className="glass-card rounded-2xl p-3 sm:p-4 border border-slate-800 flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          
          {/* Search Box */}
          <div className="relative w-full flex-1 min-w-0 sm:min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">
            
            {/* Difficulty Selector */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            {/* Topic Selector */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {TOPIC_TAGS.map((top) => (
                <option key={top} value={top}>{top}</option>
              ))}
            </select>

            {/* Solved Status Selector */}
            <select
              value={filterSolved}
              onChange={(e) => setFilterSolved(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="solved">Solved Only</option>
              <option value="unsolved">Unsolved Only</option>
            </select>

            {/* Starred Button Toggle */}
            <button
              onClick={() => setCoreOnly((current) => !current)}
              aria-pressed={coreOnly}
              className={`justify-center px-3 py-2 rounded-xl border text-xs transition-colors ${
                coreOnly
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Core set ({CORE_INTERVIEW_IDS.size})
            </button>

            <button
              onClick={() => setShowStarredOnly(!showStarredOnly)}
              className={`justify-center p-2 rounded-xl border text-xs transition-colors flex items-center gap-1.5 ${
                showStarredOnly
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Filter Bookmarked Challenges"
            >
              <Star className={`w-4 h-4 ${showStarredOnly ? 'fill-amber-400' : ''}`} />
            </button>

          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing {filteredQuestions.length} challenges</span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center space-y-3 border border-slate-800">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-semibold text-slate-300">No challenges found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query, difficulty, or topic filter to find relevant questions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5">
            {filteredQuestions.map((q, idx) => {
              const isSolved = solvedSet.has(q.id);
              const isStarred = starredSet.has(q.id);

              return (
                <div
                  key={q.id}
                  className="glass-card relative rounded-xl p-3.5 sm:p-4 border border-slate-800/80 hover:border-cyan-500/40 flex items-center justify-between gap-2 sm:gap-4 group transition-all"
                >
                  <button
                    type="button"
                    onClick={() => onSelectProblem(q)}
                    aria-label={`Open ${q.title}, ${q.difficulty} ${q.track} challenge`}
                    className="absolute inset-0 z-0 cursor-pointer rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-400"
                  />
                  {/* Left info */}
                  <div className="relative z-[1] pointer-events-none flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    {/* Solved Status Indicator */}
                    <div className="flex-shrink-0">
                      {isSolved ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950/40" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-700 group-hover:text-slate-500 transition-colors" />
                      )}
                    </div>

                    {/* Title and meta */}
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                          <span className="hidden sm:inline text-xs text-slate-500 font-mono">
                          #{q.id}
                        </span>
                        <h3 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                          {q.title}
                        </h3>

                        {/* Difficulty badge */}
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            q.difficulty === 'Easy'
                              ? 'badge-emerald'
                              : q.difficulty === 'Hard' ? 'badge-rose' : 'badge-amber'
                          }`}
                        >
                          {q.difficulty}
                        </span>

                        {/* Topic badge */}
                        {q.topic && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50 hidden sm:inline-block">
                            {q.topic}
                          </span>
                        )}
                      </div>

                      <p className="hidden sm:block text-xs text-slate-400 line-clamp-1">
                        {q.description}
                      </p>
                    </div>
                  </div>

                  {/* Right actions */}
                  <div className="relative z-10 pointer-events-none flex items-center gap-2 flex-shrink-0">
                    {/* Star Button */}
                    <button
                      onClick={(e) => handleStarClick(e, q.id)}
                      aria-label={isStarred ? `Remove ${q.title} bookmark` : `Bookmark ${q.title}`}
                      className={`pointer-events-auto p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors ${
                        isStarred ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                      }`}
                      title={isStarred ? 'Remove Bookmark' : 'Bookmark Question'}
                    >
                      <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
                    </button>

                    <ChevronRight aria-hidden="true" className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
