import React from 'react';
import { Database, Table } from 'lucide-react';

export function SqlTableViewer({ tables }) {
  if (!tables || tables.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500 text-xs font-mono">
        No schema tables available.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 overflow-x-auto">
      {tables.map((tbl, idx) => (
        <div key={idx} className="space-y-2 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/60">
          <div className="px-3 py-2 bg-slate-800/80 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Table className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-slate-200 font-mono">
                {tbl.name}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              {tbl.rows ? tbl.rows.length : 0} rows
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="sql-table">
              <thead>
                <tr>
                  {tbl.columns.map((col, cIdx) => (
                    <th key={cIdx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tbl.rows && tbl.rows.length > 0 ? (
                  tbl.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((val, vIdx) => (
                        <td key={vIdx} className="font-mono">
                          {val === null ? (
                            <span className="text-slate-500 italic">NULL</span>
                          ) : (
                            String(val)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={tbl.columns.length} className="text-center text-slate-500 py-3 text-xs italic">
                      Table is empty
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
