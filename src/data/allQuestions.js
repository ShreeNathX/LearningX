import { programmingQuestions } from './programmingQuestions.js';
import { dsaQuestions } from './dsaQuestions.js';
import { sqlQuestions } from './sqlQuestions.js';
import { analystSqlQuestions } from './analystSqlQuestions.js';
import { analystSqlAdvancedQuestions } from './analystSqlAdvancedQuestions.js';

export const allQuestions = [
  ...programmingQuestions,
  ...dsaQuestions,
  ...sqlQuestions,
  ...analystSqlQuestions,
  ...analystSqlAdvancedQuestions
];

export const getQuestionById = (id) => {
  return allQuestions.find((q) => q.id === id);
};

export const getQuestionsByTrack = (track) => {
  if (!track || track === 'all') return allQuestions;
  return allQuestions.filter((q) => q.track === track);
};
