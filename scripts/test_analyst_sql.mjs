import { fileURLToPath } from 'node:url';
import initSqlJs from 'sql.js';
import { allQuestions } from '../src/data/allQuestions.js';

const questions = allQuestions.filter((question) => question.analystPrep);
const wasmPath = fileURLToPath(new URL('../node_modules/sql.js/dist/sql-wasm.wasm', import.meta.url));
const SQL = await initSqlJs({ locateFile: () => wasmPath });
const failures = [];

for (const question of questions) {
  const db = new SQL.Database();
  try {
    db.run(question.schemaSql);
    const actual = readFirstResult(db.exec(question.solution));
    const expected = readFirstResult(db.exec(question.expectedQuery));
    if (!actual || !expected) throw new Error('Solution or expected query returned no result set.');

    const actualRows = actual.values.map((row) => JSON.stringify(row)).sort();
    const expectedRows = expected.values.map((row) => JSON.stringify(row)).sort();
    if (JSON.stringify(actual.columns) !== JSON.stringify(expected.columns) ||
        JSON.stringify(actualRows) !== JSON.stringify(expectedRows)) {
      throw new Error('Solution output does not match the reference output.');
    }
  } catch (error) {
    failures.push(`${question.id} (${question.title}): ${error.message}`);
  } finally {
    db.close();
  }
}

if (failures.length) {
  console.error(`Analyst SQL checks failed:\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`Analyst SQL checks passed: ${questions.length} reference solutions match their expected results.`);
}

function readFirstResult(results) {
  if (!results?.length) return null;
  return { columns: results[0].columns, values: results[0].values };
}
