const STORAGE_KEY = 'learningx_user_data_v1';

const createDefaultData = () => ({
  solved: {},
  starred: [],
  savedCode: {},
  notes: {},
  analystStatus: {},
  history: [],
  streakDates: []
});

const isRecord = (value) => value && typeof value === 'object' && !Array.isArray(value);
const safeRecord = (value) => Object.fromEntries(
  Object.entries(isRecord(value) ? value : {}).filter(([key]) =>
    key !== '__proto__' && key !== 'constructor' && key !== 'prototype'
  )
);
const isValidDateKey = (date) => {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const [year, month, day] = date.split('-').map(Number);
  return getLocalDateString(new Date(year, month - 1, day)) === date;
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
    if (!raw) return createDefaultData();
    const parsed = JSON.parse(raw);
    if (!isRecord(parsed)) return createDefaultData();
    return {
      solved: safeRecord(parsed.solved),
      starred: Array.isArray(parsed.starred) ? parsed.starred.filter((id) => typeof id === 'string') : [],
      savedCode: Object.fromEntries(Object.entries(safeRecord(parsed.savedCode)).filter(([, code]) => typeof code === 'string')),
      notes: Object.fromEntries(Object.entries(safeRecord(parsed.notes)).filter(([, note]) => typeof note === 'string')),
      analystStatus: Object.fromEntries(Object.entries(safeRecord(parsed.analystStatus)).filter(([, status]) => status === 'review' || status === 'known')),
      history: Array.isArray(parsed.history) ? parsed.history.filter((entry) => isRecord(entry)) : [],
      streakDates: Array.isArray(parsed.streakDates) ? parsed.streakDates.filter(isValidDateKey) : []
    };
  } catch (e) {
    console.warn('Failed to parse user data from localStorage, falling back to defaults:', e);
    return createDefaultData();
  }
}

export function saveUserData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      console.warn('localStorage quota exceeded. Retrying without older activity history.');
      try {
        const compactData = { ...data, history: (data.history || []).slice(0, 10) };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(compactData));
        return true;
      } catch (innerErr) {
        console.error('Critical storage quota failure:', innerErr);
        return false;
      }
    } else {
      console.error('Failed to save user data:', e);
      return false;
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

  return saveUserData(data);
}

export function toggleStarProblem(problemId) {
  if (!problemId) return false;
  const data = loadUserData();
  const idx = data.starred.indexOf(problemId);
  if (idx >= 0) {
    data.starred.splice(idx, 1);
  } else {
    data.starred.push(problemId);
  }
  const saved = saveUserData(data);
  return saved;
}

export function saveCode(problemId, language, code) {
  if (!problemId) return false;
  const data = loadUserData();
  data.savedCode[`${problemId}_${language}`] = code;
  return saveUserData(data);
}

export function getSavedCode(problemId, language) {
  if (!problemId) return null;
  const data = loadUserData();
  return data.savedCode[`${problemId}_${language}`] || null;
}

export function saveNote(problemId, note) {
  if (!problemId) return false;
  const data = loadUserData();
  data.notes[problemId] = note;
  return saveUserData(data);
}

export function setAnalystQuestionStatus(questionId, status) {
  if (!questionId || !['review', 'known', null].includes(status)) return false;
  const data = loadUserData();
  if (status === null) delete data.analystStatus[questionId];
  else data.analystStatus[questionId] = status;
  return saveUserData(data);
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
  const todayDate = new Date();
  const today = getLocalDateString(todayDate);
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getLocalDateString(yesterdayDate);

  if (sorted[0] !== today && sorted[0] !== yesterday) {
    return 0; // Streak broken
  }

  let streak = 1;
  const [year, month, day] = sorted[0].split('-').map(Number);
  let curr = new Date(year, month - 1, day);

  for (let i = 1; i < sorted.length; i++) {
    const previousDate = new Date(curr);
    previousDate.setDate(previousDate.getDate() - 1);
    const prevExpected = getLocalDateString(previousDate);
    if (sorted[i] === prevExpected) {
      streak++;
      curr = previousDate;
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
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (err) {
    console.error('Export failure:', err);
    alert('Failed to export data: ' + err.message);
  }
}

export function importDataFromJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    const fieldTypes = {
      solved: isRecord,
      starred: Array.isArray,
      savedCode: isRecord,
      notes: isRecord,
      analystStatus: isRecord,
      history: Array.isArray,
      streakDates: Array.isArray
    };
    const hasValidData = isRecord(parsed) && Object.entries(fieldTypes).some(([key, isValid]) =>
      Object.hasOwn(parsed, key) && isValid(parsed[key])
    );
    const hasInvalidField = isRecord(parsed) && Object.entries(fieldTypes).some(([key, isValid]) =>
      Object.hasOwn(parsed, key) && !isValid(parsed[key])
    );
    if (hasValidData && !hasInvalidField) {
      const sanitized = {
        solved: safeRecord(parsed.solved),
        starred: Array.isArray(parsed.starred) ? parsed.starred.filter((id) => typeof id === 'string') : [],
        savedCode: Object.fromEntries(Object.entries(safeRecord(parsed.savedCode)).filter(([, code]) => typeof code === 'string')),
        notes: Object.fromEntries(Object.entries(safeRecord(parsed.notes)).filter(([, note]) => typeof note === 'string')),
        analystStatus: Object.fromEntries(Object.entries(safeRecord(parsed.analystStatus)).filter(([, status]) => status === 'review' || status === 'known')),
        history: Array.isArray(parsed.history) ? parsed.history.filter((entry) => isRecord(entry)) : [],
        streakDates: Array.isArray(parsed.streakDates) ? parsed.streakDates.filter(isValidDateKey) : []
      };
      return saveUserData(sanitized);
    }
  } catch (e) {
    console.error('Invalid JSON file format:', e);
  }
  return false;
}
