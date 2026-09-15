import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

let sqlPromise = null;

export async function getSqlInstance() {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: () => sqlWasmUrl
    }).catch((err) => {
      sqlPromise = null;
      throw new Error(
        `Failed to load SQLite WebAssembly engine: ${err.message || err}. Refresh the page and try again.`
      );
    });
  }
  return sqlPromise;
}

export async function executeSqlQuery(userQuery, schemaSql, expectedQuery) {
  const startTime = performance.now();

  if (!userQuery || !userQuery.trim()) {
    return {
      success: false,
      passed: false,
      feedback: 'Query Error',
      userResult: null,
      expectedResult: null,
      executionTimeMs: 0,
      error: 'SQL editor is empty. Please enter your SQL query.'
    };
  }

  let db = null;
  try {
    const SQL = await getSqlInstance();
    db = new SQL.Database();

    if (schemaSql && schemaSql.trim()) {
      try {
        db.run(schemaSql);
      } catch (schemaErr) {
        throw new Error(`Schema setup failure: ${schemaErr.message}`);
      }
    }

    let expectedResult = null;
    if (expectedQuery && expectedQuery.trim()) {
      try {
        const expExec = db.exec(expectedQuery);
        if (expExec && expExec.length > 0) {
          expectedResult = {
            columns: expExec[0].columns || [],
            values: expExec[0].values || []
          };
        } else {
          expectedResult = { columns: [], values: [] };
        }
      } catch (expErr) {
        console.warn('Canonical query warning:', expErr);
      }
    }

    const userExec = db.exec(userQuery);
    const endTime = performance.now();
    const executionTimeMs = Math.round((endTime - startTime) * 10) / 10;

    let userResult = { columns: [], values: [] };
    if (userExec && userExec.length > 0) {
      userResult = {
        columns: userExec[0].columns || [],
        values: userExec[0].values || []
      };
    }

    let passed = false;
    let feedback = '';

    if (!expectedResult) {
      passed = true;
      feedback = 'Query executed successfully.';
    } else {
      const match = compareSqlResults(userResult, expectedResult, userQuery);
      passed = match.passed;
      feedback = match.reason;
    }

    return {
      success: true,
      passed,
      feedback,
      userResult,
      expectedResult,
      executionTimeMs,
      error: null
    };
  } catch (error) {
    const endTime = performance.now();
    return {
      success: false,
      passed: false,
      feedback: 'SQL Execution Error',
      userResult: null,
      expectedResult: null,
      executionTimeMs: Math.round((endTime - startTime) * 10) / 10,
      error: error.message || String(error)
    };
  } finally {
    if (db) {
      try {
        db.close();
      } catch (_) {
        // ignore close error
      }
    }
  }
}

function compareSqlResults(actual, expected, userQuery = '') {
  if (!actual || !expected) {
    return { passed: false, reason: 'Empty query result set.' };
  }

  if (actual.columns.length !== expected.columns.length) {
    return {
      passed: false,
      reason: `Column count mismatch. Expected ${expected.columns.length} columns (${expected.columns.join(', ')}), got ${actual.columns.length} columns (${actual.columns.join(', ')}).`
    };
  }

  if (actual.columns.some((column, index) => column !== expected.columns[index])) {
    return {
      passed: false,
      reason: `Column name mismatch. Expected: ${expected.columns.join(', ')}. Got: ${actual.columns.join(', ')}.`
    };
  }

  if (actual.values.length !== expected.values.length) {
    return {
      passed: false,
      reason: `Row count mismatch. Expected ${expected.values.length} rows, but got ${actual.values.length} rows.`
    };
  }

  const normalizeVal = (v) => {
    if (v === null || v === undefined) return 'NULL';
    if (typeof v === 'number') {
      return String(Number(v.toFixed(4)));
    }
    return String(v);
  };

  const serializeRow = (row) => row.map(normalizeVal).join('|||');

  const requiresOrdering = /\border\s+by\b/i.test(userQuery);

  if (requiresOrdering) {
    for (let i = 0; i < expected.values.length; i++) {
      const actRow = serializeRow(actual.values[i]);
      const expRow = serializeRow(expected.values[i]);
      if (actRow !== expRow) {
        return {
          passed: false,
          reason: `Ordering or value mismatch at row ${i + 1}. Expected: [${expRow}], Got: [${actRow}]`
        };
      }
    }
  } else {
    const actualRows = actual.values.map(serializeRow).sort();
    const expectedRows = expected.values.map(serializeRow).sort();

    for (let i = 0; i < expectedRows.length; i++) {
      if (actualRows[i] !== expectedRows[i]) {
        return {
          passed: false,
          reason: `Value mismatch at row ${i + 1}. Expected: [${expectedRows[i]}], Got: [${actualRows[i]}]`
        };
      }
    }
  }

  return { passed: true, reason: 'All test assertions passed!' };
}

export async function getTablesData(schemaSql) {
  if (!schemaSql) return [];
  let db = null;
  try {
    const SQL = await getSqlInstance();
    db = new SQL.Database();
    db.run(schemaSql);

    const tablesRes = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
    if (!tablesRes || tablesRes.length === 0) return [];

    const tables = [];
    for (const row of tablesRes[0].values) {
      const tableName = row[0];
      const tableContent = db.exec(`SELECT * FROM "${tableName}" LIMIT 10;`);
      if (tableContent && tableContent.length > 0) {
        tables.push({
          name: tableName,
          columns: tableContent[0].columns || [],
          rows: tableContent[0].values || []
        });
      } else {
        const pragma = db.exec(`PRAGMA table_info("${tableName}");`);
        const cols = pragma && pragma[0] ? pragma[0].values.map((c) => c[1]) : [];
        tables.push({
          name: tableName,
          columns: cols,
          rows: []
        });
      }
    }
    return tables;
  } catch (e) {
    console.warn('Failed to read schema tables:', e);
    return [];
  } finally {
    if (db) {
      try {
        db.close();
      } catch (_) {}
    }
  }
}
