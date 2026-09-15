import { programmingQuestions } from './programmingQuestions.js';
import { dsaQuestions } from './dsaQuestions.js';
import { sqlQuestions } from './sqlQuestions.js';

export const allQuestions = [
  ...programmingQuestions,
  ...dsaQuestions,
  ...sqlQuestions
];

export const getQuestionById = (id) => {
  return allQuestions.find((q) => q.id === id);
};

export const getQuestionsByTrack = (track) => {
  if (!track || track === 'all') return allQuestions;
  return allQuestions.filter((q) => q.track === track);
};
