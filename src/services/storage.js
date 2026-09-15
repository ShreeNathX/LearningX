const STORAGE_KEY = 'learningx_user_data_v1';

const defaultData = {
  solved: {}, // { [problemId]: { solvedAt: timestamp, language: 'python' } }
  starred: [], // [problemId, ...]
  savedCode: {}, // { [`${problemId}_${language}`]: code }
  notes: {}, // { [problemId]: noteText }
  history: [], // [{ problemId, timestamp, status }]
  streakDates: [] // ['2026-09-14', ...]
};

/**
 * Return YYYY-MM-DD in user's LOCAL timezone
 */
export function getLocalDateString(dateObj = new Date()) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadUserData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    return {
      solved: parsed.solved || {},
      starred: Array.isArray(parsed.starred) ? parsed.starred : [],
      savedCode: parsed.savedCode || {},
      notes: parsed.notes || {},
      history: Array.isArray(parsed.history) ? parsed.history : [],
      streakDates: Array.isArray(parsed.streakDates) ? parsed.streakDates : []
    };
  } catch (e) {
    console.warn('Failed to parse user data from localStorage, falling back to defaults:', e);
    return defaultData;
  }
}

export function saveUserData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      console.warn('localStorage quota exceeded. Trimming older code history to free space...');
      try {
        // Trim history and cache
        data.history = (data.history || []).slice(0, 10);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (innerErr) {
        console.error('Critical storage quota failure:', innerErr);
      }
    } else {
      console.error('Failed to save user data:', e);
    }
  }
}

export function markProblemSolved(problemId, language) {
  if (!problemId) return loadUserData();
  const data = loadUserData();
  const today = getLocalDateString();

  data.solved[problemId] = {
    solvedAt: Date.now(),
    language: language || 'python'
  };

  if (!data.streakDates.includes(today)) {
    data.streakDates.push(today);
  }

  data.history.unshift({
    problemId,
    timestamp: Date.now(),
    status: 'SOLVED'
  });

  if (data.history.length > 50) {
    data.history = data.history.slice(0, 50);
  }

  saveUserData(data);
  return data;
}

export function toggleStarProblem(problemId) {
  if (!problemId) return [];
  const data = loadUserData();
  const idx = data.starred.indexOf(problemId);
  if (idx >= 0) {
    data.starred.splice(idx, 1);
  } else {
    data.starred.push(problemId);
  }
  saveUserData(data);
  return data.starred;
}

export function saveCode(problemId, language, code) {
  if (!problemId) return;
  const data = loadUserData();
  data.savedCode[`${problemId}_${language}`] = code;
  saveUserData(data);
}

export function getSavedCode(problemId, language) {
  if (!problemId) return null;
  const data = loadUserData();
  return data.savedCode[`${problemId}_${language}`] || null;
}

export function saveNote(problemId, note) {
  if (!problemId) return;
  const data = loadUserData();
  data.notes[problemId] = note;
  saveUserData(data);
}

export function getNote(problemId) {
  if (!problemId) return '';
  const data = loadUserData();
  return data.notes[problemId] || '';
}

export function calculateStreak(dates) {
  if (!dates || dates.length === 0) return 0;
  
  // Dedup and sort in descending order
  const sorted = [...new Set(dates)].sort().reverse();
  const today = getLocalDateString(new Date());
  const yesterday = getLocalDateString(new Date(Date.now() - 86400000));

  if (sorted[0] !== today && sorted[0] !== yesterday) {
    return 0; // Streak broken
  }

  let streak = 1;
  let curr = new Date(sorted[0].replace(/-/g, '/')); // Use / for safe date parsing

  for (let i = 1; i < sorted.length; i++) {
    const prevExpected = getLocalDateString(new Date(curr.getTime() - 86400000));
    if (sorted[i] === prevExpected) {
      streak++;
      curr = new Date(prevExpected.replace(/-/g, '/'));
    } else {
      break;
    }
  }

  return streak;
}

export function exportDataAsJson() {
  try {
    const data = loadUserData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learningx_backup_${getLocalDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Export failure:', err);
    alert('Failed to export data: ' + err.message);
  }
}

export function importDataFromJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && typeof parsed === 'object') {
      const sanitized = {
        solved: parsed.solved && typeof parsed.solved === 'object' ? parsed.solved : {},
        starred: Array.isArray(parsed.starred) ? parsed.starred : [],
        savedCode: parsed.savedCode && typeof parsed.savedCode === 'object' ? parsed.savedCode : {},
        notes: parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {},
        history: Array.isArray(parsed.history) ? parsed.history : [],
        streakDates: Array.isArray(parsed.streakDates) ? parsed.streakDates : []
      };
      saveUserData(sanitized);
      return true;
    }
  } catch (e) {
    console.error('Invalid JSON file format:', e);
  }
  return false;
}
