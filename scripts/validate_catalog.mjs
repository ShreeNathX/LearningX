import { allQuestions } from '../src/data/allQuestions.js';

const errors = [];

for (const question of allQuestions) {
  if (!question.id || !question.title || !question.track) {
    errors.push('A question is missing its id, title, or track.');
    continue;
  }

  if (question.track === 'sql') {
    if (!question.starterCode || !question.schemaSql || !question.expectedQuery) {
      errors.push(`${question.id}: SQL questions need starter code, schema SQL, and an expected query.`);
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
