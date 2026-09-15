import React, { useState, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  Star, 
  Filter, 
  Sparkles, 
  Shuffle, 
  BookOpen, 
  ChevronRight,
  Code2,
  GitMerge,
  Database,
  ArrowUpDown
} from 'lucide-react';
import { TRACKS, DIFFICULTIES, TOPIC_TAGS } from '../data/categories';
import { toggleStarProblem } from '../services/storage';

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
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'title' | 'difficulty'

  const solvedSet = useMemo(() => {
    const availableIds = new Set(questions.map((question) => question.id));
    return new Set(Object.keys(userData.solved || {}).filter((id) => availableIds.has(id)));
  }, [questions, userData.solved]);
  const starredSet = useMemo(() => new Set(userData.starred || []), [userData.starred]);

  // Filter and sort questions
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

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchTopic = (q.topic || '').toLowerCase().includes(query);
        const matchDesc = (q.description || '').toLowerCase().includes(query);
        if (!matchTitle && !matchTopic && !matchDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'difficulty') return a.difficulty.localeCompare(b.difficulty);
      return 0; // default order
    });
  }, [
    questions, 
    currentTrack, 
    selectedDifficulty, 
    selectedTopic, 
    filterSolved, 
    showStarredOnly, 
    searchQuery, 
    sortBy, 
    solvedSet, 
    starredSet
  ]);

  const handleStarClick = (e, problemId) => {
    e.stopPropagation();
    toggleStarProblem(problemId);
    onUserDataUpdate();
  };

  const pickRandomProblem = () => {
    if (filteredQuestions.length === 0) return;
    const randomIdx = Math.floor(Math.random() * filteredQuestions.length);
    onSelectProblem(filteredQuestions[randomIdx]);
  };

  // Stats calculation
  const totalCount = questions.length;
  const solvedCount = solvedSet.size;
  const easyCount = questions.filter(q => q.difficulty === 'Easy').length;
  const mediumCount = questions.filter(q => q.difficulty === 'Medium').length;
  const solvedEasy = questions.filter(q => q.difficulty === 'Easy' && solvedSet.has(q.id)).length;
  const solvedMedium = questions.filter(q => q.difficulty === 'Medium' && solvedSet.has(q.id)).length;
  const remainingCount = Math.max(0, totalCount - solvedCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Hero Overview & Progress Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Banner Card */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Job-Ready Interview Curriculum</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Master Modern Programming, Algorithms & SQL
            </h1>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Curated bank of 185+ real-world interview challenges with zero-latency browser execution, instant test evaluation, and offline storage.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={pickRandomProblem}
                className="btn-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Pick Random Challenge
              </button>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-8 translate-y-8">
            <Code2 className="w-64 h-64 text-cyan-400" />
          </div>
        </div>

        {/* Stats Progress Card */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
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
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        
        {/* Track Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
        <div className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
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
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Difficulty Selector */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
            </select>

            {/* Topic Selector */}
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer max-w-[170px]"
            >
              {TOPIC_TAGS.map((top) => (
                <option key={top} value={top}>{top}</option>
              ))}
            </select>

            {/* Solved Status Selector */}
            <select
              value={filterSolved}
              onChange={(e) => setFilterSolved(e.target.value)}
              className="px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="solved">Solved Only</option>
              <option value="unsolved">Unsolved Only</option>
            </select>

            {/* Starred Button Toggle */}
            <button
              onClick={() => setShowStarredOnly(!showStarredOnly)}
              className={`p-2 rounded-xl border text-xs transition-colors flex items-center gap-1.5 ${
                showStarredOnly
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title="Filter Bookmarked Challenges"
            >
              <Star className={`w-4 h-4 ${showStarredOnly ? 'fill-amber-400' : ''}`} />
            </button>

            {/* Sort Toggle */}
            <button
              onClick={() => {
                const next = sortBy === 'default' ? 'title' : sortBy === 'title' ? 'difficulty' : 'default';
                setSortBy(next);
              }}
              className="px-3 py-2 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 hover:text-slate-100 flex items-center gap-1.5"
              title={`Sorting by: ${sortBy}`}
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <span className="capitalize">{sortBy}</span>
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
                  onClick={() => onSelectProblem(q)}
                  className="glass-card rounded-xl p-4 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer flex items-center justify-between gap-4 group transition-all"
                >
                  {/* Left info */}
                  <div className="flex items-center gap-3.5 min-w-0">
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
                        <span className="text-xs text-slate-500 font-mono">
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
                              : 'badge-amber'
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

                      <p className="text-xs text-slate-400 line-clamp-1">
                        {q.description}
                      </p>
                    </div>
                  </div>

                  {/* Right actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Star Button */}
                    <button
                      onClick={(e) => handleStarClick(e, q.id)}
                      className={`p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors ${
                        isStarred ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                      }`}
                      title={isStarred ? 'Remove Bookmark' : 'Bookmark Question'}
                    >
                      <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
                    </button>

                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
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
