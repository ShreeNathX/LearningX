import { allQuestions } from '../src/data/allQuestions.js';
import { TOPIC_TAGS } from '../src/data/categories.js';

const errors = [];
const seenIds = new Set();

for (const question of allQuestions) {
  if (!question.id || !question.title || !question.track) {
    errors.push('A question is missing its id, title, or track.');
    continue;
  }

  if (seenIds.has(question.id)) {
    errors.push(`${question.id}: question IDs must be unique.`);
  }
  seenIds.add(question.id);

  if (question.topic && !TOPIC_TAGS.includes(question.topic)) {
    errors.push(`${question.id}: topic '${question.topic}' is missing from the filter catalog.`);
  }

  if (!Array.isArray(question.examples) || question.examples.length < 2) {
    errors.push(`${question.id}: add at least two examples.`);
  } else {
    for (const [index, example] of question.examples.entries()) {
      if (typeof example.input !== 'string' || !example.input.trim() || typeof example.output !== 'string' || !example.output.trim()) {
        errors.push(`${question.id}: example ${index + 1} needs non-empty input and output text.`);
      }
    }
  }

  if (question.track === 'sql') {
    if (typeof question.starterCode !== 'string' || !question.schemaSql || !question.expectedQuery) {
      errors.push(`${question.id}: SQL questions need starter code, schema SQL, and an expected query.`);
    }
    if (typeof question.solution === 'string' && /^\s*(UPDATE|DELETE|INSERT)\b/i.test(question.solution) && !question.resultQuery) {
      errors.push(`${question.id}: SQL statement solutions need a resultQuery so their effects can be verified.`);
    }
    continue;
  }

  const starter = question.starterCode?.python;
  if (!starter || !/^\s*def\s+[A-Za-z_]\w*\s*\(/m.test(starter)) {
    errors.push(`${question.id}: Python starter code must define a callable function.`);
  }
  if (!Array.isArray(question.testCases) || question.testCases.length < 2) {
    errors.push(`${question.id}: Add at least two test cases.`);
  }
  for (const [index, testCase] of (question.testCases || []).entries()) {
    if (!Object.hasOwn(testCase, 'input') || !Object.hasOwn(testCase, 'expected')) {
      errors.push(`${question.id}: test case ${index + 1} needs both input and expected output.`);
    }
  }
}

if (errors.length) {
  console.error(`Catalog validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`Catalog valid: ${allQuestions.length} browser-ready challenges.`);
