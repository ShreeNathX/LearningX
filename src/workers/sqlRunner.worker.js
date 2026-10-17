import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

const MAX_RESULT_ROWS = 500;

self.onmessage = async ({ data }) => {
  let db;
  try {
    const SQL = await initSqlJs({ locateFile: () => sqlWasmUrl });
    db = new SQL.Database();
    if (data.schemaSql?.trim()) db.run(data.schemaSql);

    const expectedResult = readFirstResult(db.exec(data.expectedQuery || ''));
    if (!expectedResult) throw new Error('This challenge has no valid reference result, so the query cannot be graded.');

    self.postMessage({ status: 'executing' });
    let userResult = readFirstResult(db.exec(data.userQuery));
    userResult ||= { columns: [], values: [] };
    if (data.resultQuery && userResult.columns.length === 0) {
      userResult = readFirstResult(db.exec(data.resultQuery)) || userResult;
    }
    if (userResult.values.length > MAX_RESULT_ROWS || expectedResult.values.length > MAX_RESULT_ROWS) {
      throw new Error(`Query result exceeded the ${MAX_RESULT_ROWS}-row display limit.`);
    }
    const comparison = compareSqlResults(userResult, expectedResult, data.userQuery);
    self.postMessage({ result: {
      success: true,
      passed: comparison.passed,
      feedback: comparison.reason,
      userResult,
      expectedResult,
      error: null
    }});
  } catch (error) {
    self.postMessage({ result: {
      success: false,
      passed: false,
      feedback: 'SQL Execution Error',
      userResult: null,
      expectedResult: null,
      error: error?.message || String(error)
    }});
  } finally {
    try { db?.close(); } catch (_) { /* ignore close errors */ }
  }
};

function readFirstResult(results) {
  if (!results?.length) return null;
  return { columns: results[0].columns || [], values: results[0].values || [] };
}

function compareSqlResults(actual, expected, userQuery) {
  if (actual.columns.length !== expected.columns.length) {
    return { passed: false, reason: `Column count mismatch. Expected ${expected.columns.length} columns (${expected.columns.join(', ')}), got ${actual.columns.length} columns (${actual.columns.join(', ')}).` };
  }
  if (actual.columns.some((column, index) => column !== expected.columns[index])) {
    return { passed: false, reason: `Column name mismatch. Expected: ${expected.columns.join(', ')}. Got: ${actual.columns.join(', ')}.` };
  }
  if (actual.values.length !== expected.values.length) {
    return { passed: false, reason: `Row count mismatch. Expected ${expected.values.length} rows, but got ${actual.values.length} rows.` };
  }

  const serializeRow = (row) => JSON.stringify(row.map((value) => value === undefined ? null : value));
  const actualRows = actual.values.map(serializeRow);
  const expectedRows = expected.values.map(serializeRow);
  if (!hasTopLevelOrderBy(userQuery)) {
    actualRows.sort();
    expectedRows.sort();
  }
  for (let index = 0; index < expectedRows.length; index += 1) {
    if (actualRows[index] !== expectedRows[index]) {
      return { passed: false, reason: `Value or ordering mismatch at row ${index + 1}. Expected: ${expectedRows[index]}, Got: ${actualRows[index]}.` };
    }
  }
  return { passed: true, reason: 'All test assertions passed!' };
}

function hasTopLevelOrderBy(query = '') {
  let depth = 0;
  let quote = null;
  for (let index = 0; index < query.length; index += 1) {
    const char = query[index];
    const next = query[index + 1];
    if (quote) {
      if (char === quote) {
        if (next === quote && quote !== ']') index += 1;
        else quote = null;
      }
      continue;
    }
    if (char === '-' && next === '-') {
      while (index < query.length && query[index] !== '\n') index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      index += 2;
      while (index < query.length && !(query[index] === '*' && query[index + 1] === '/')) index += 1;
      index += 1;
      continue;
    }
    if (char === "'" || char === '"' || char === '`' || char === '[') {
      quote = char === '[' ? ']' : char;
      continue;
    }
    if (char === '(') depth += 1;
    else if (char === ')') depth = Math.max(0, depth - 1);
    else if (depth === 0 && /^order\s+by\b/i.test(query.slice(index)) &&
      (index === 0 || !/[\w]/.test(query[index - 1]))) return true;
  }
  return false;
}
