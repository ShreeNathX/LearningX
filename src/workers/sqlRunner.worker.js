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
  if (!/\border\s+by\b/i.test(userQuery)) {
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
