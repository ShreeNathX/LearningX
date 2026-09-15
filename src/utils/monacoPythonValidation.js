import { validatePythonIndentation } from './pythonIndentValidator';

const MARKER_OWNER = 'learningx-python-indent';

export function applyPythonIndentMarkers(monaco, model, code, tabSize = 4) {
  if (!monaco || !model) return;

  const issues = validatePythonIndentation(code, tabSize);
  const markers = issues.map((issue) => ({
    severity: monaco.MarkerSeverity.Error,
    startLineNumber: issue.line,
    startColumn: issue.column,
    endLineNumber: issue.line,
    endColumn: Math.max(issue.column + 1, model.getLineMaxColumn(issue.line)),
    message: issue.message,
    source: 'python'
  }));

  monaco.editor.setModelMarkers(model, MARKER_OWNER, markers);
}

export function clearPythonIndentMarkers(monaco, model) {
  if (!monaco || !model) return;
  monaco.editor.setModelMarkers(model, MARKER_OWNER, []);
}

/**
 * Debounced live indentation diagnostics while editing Python.
 * @returns {() => void} dispose
 */
export function attachPythonIndentValidation(editor, monaco, tabSize = 4) {
  if (!editor || !monaco) return () => {};

  const model = editor.getModel();
  if (!model) return () => {};

  let timer = null;

  const refresh = () => {
    applyPythonIndentMarkers(monaco, model, model.getValue(), tabSize);
  };

  const sub = model.onDidChangeContent(() => {
    clearTimeout(timer);
    timer = setTimeout(refresh, 120);
  });

  refresh();

  return () => {
    clearTimeout(timer);
    try {
      sub.dispose();
    } catch (_) {
      /* editor may already be unmounted */
    }
    try {
      if (model && (!model.isDisposed || !model.isDisposed())) {
        clearPythonIndentMarkers(monaco, model);
      }
    } catch (_) {
      /* model disposed during React unmount */
    }
  };
}
