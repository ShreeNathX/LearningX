const LOAD_TIMEOUT_MS = 30000;
const SQL_TIMEOUT_MS = 5000;

export function executeSqlQuery(userQuery, schemaSql, expectedQuery, resultQuery = '') {
  const startTime = performance.now();
  if (!userQuery?.trim()) {
    return Promise.resolve(failure('SQL editor is empty. Please enter your SQL query.', startTime));
  }

  return new Promise((resolve) => {
    let settled = false;
    let sqlWorker;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      sqlWorker?.terminate();
      resolve({ ...result, executionTimeMs: Math.round((performance.now() - startTime) * 10) / 10 });
    };

    let timer = setTimeout(() => finish(failure('SQL runtime loading timed out. Please try again.', startTime)), LOAD_TIMEOUT_MS);
    try {
      sqlWorker = new Worker(new URL('../workers/sqlRunner.worker.js', import.meta.url), { type: 'module' });
      sqlWorker.onmessage = ({ data }) => {
        if (data.status === 'executing') {
          clearTimeout(timer);
          timer = setTimeout(() => finish(failure('SQL query timed out after 5 seconds. Check for an expensive or recursive query.', startTime)), SQL_TIMEOUT_MS);
          return;
        }
        finish(data.result);
      };
      sqlWorker.onerror = () => finish(failure('The SQL worker stopped unexpectedly. Please try again.', startTime));
      sqlWorker.postMessage({ userQuery, schemaSql, expectedQuery, resultQuery });
    } catch (error) {
      finish(failure(`Unable to start the SQL worker: ${error?.message || error}`, startTime));
    }
  });
}

function failure(error, startTime) {
  return {
    success: false,
    passed: false,
    feedback: 'SQL Execution Error',
    userResult: null,
    expectedResult: null,
    executionTimeMs: Math.round((performance.now() - startTime) * 10) / 10,
    error
  };
}

export async function getTablesData(schemaSql) {
  if (!schemaSql) return [];
  let db = null;
  try {
    const SQL = await getSqlInstance();
    db = new SQL.Database();
    db.run(schemaSql);
    const tablesRes = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
    if (!tablesRes?.length) return [];
    return tablesRes[0].values.map(([tableName]) => {
      const tableContent = db.exec(`SELECT * FROM "${String(tableName).replaceAll('"', '""')}" LIMIT 10;`);
      if (tableContent?.length) return { name: tableName, columns: tableContent[0].columns || [], rows: tableContent[0].values || [] };
      const pragma = db.exec(`PRAGMA table_info("${String(tableName).replaceAll('"', '""')}");`);
      return { name: tableName, columns: pragma?.[0]?.values.map((column) => column[1]) || [], rows: [] };
    });
  } catch (error) {
    console.warn('Failed to read schema tables:', error);
    return [];
  } finally {
    try { db?.close(); } catch (_) { /* ignore close errors */ }
  }
}

let sqlPromise = null;
async function getSqlInstance() {
  if (!sqlPromise) {
    const [{ default: initSqlJs }, { default: sqlWasmUrl }] = await Promise.all([
      import('sql.js'), import('sql.js/dist/sql-wasm.wasm?url')
    ]);
    sqlPromise = initSqlJs({ locateFile: () => sqlWasmUrl }).catch((error) => {
      sqlPromise = null;
      throw error;
    });
  }
  return sqlPromise;
}
