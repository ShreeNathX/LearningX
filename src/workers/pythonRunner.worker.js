let pyodidePromise = null;

async function getPyodide() {
  if (!pyodidePromise) {
    try {
      importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js');
      pyodidePromise = self.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' });
      await pyodidePromise;
    } catch (error) {
      pyodidePromise = null;
      throw error;
    }
  }
  return pyodidePromise;
}

self.onmessage = async ({ data }) => {
  const { id, userCode, testCases, entryPoint } = data;
  try {
    const py = await getPyodide();
    self.postMessage({ id, status: 'executing' });
    py.globals.set('__test_cases_json__', JSON.stringify(testCases));
    py.globals.set('__user_code_raw__', userCode);
    py.globals.set('__entry_point__', entryPoint);
    const raw = await py.runPythonAsync(String.raw`
import copy, io, json, math, sys
_stdout, _original_stdout = io.StringIO(), sys.stdout
sys.stdout = _stdout
def normalize(value):
    if isinstance(value, dict): return {str(key): normalize(item) for key, item in sorted(value.items(), key=lambda item: str(item[0]))}
    if isinstance(value, (list, tuple)): return [normalize(item) for item in value]
    if isinstance(value, set): return sorted((normalize(item) for item in value), key=repr)
    return value
def matches(actual, expected):
    if isinstance(actual, float) and isinstance(expected, (float, int)): return math.isclose(actual, expected, rel_tol=1e-9, abs_tol=1e-9)
    if isinstance(actual, list) and isinstance(expected, list): return len(actual) == len(expected) and all(matches(a, b) for a, b in zip(actual, expected))
    if isinstance(actual, dict) and isinstance(expected, dict): return actual.keys() == expected.keys() and all(matches(actual[key], expected[key]) for key in actual)
    return actual == expected
try:
    namespace = {'__name__': '__main__', '__doc__': None}
    exec(__user_code_raw__, namespace)
    solution_class, target = namespace.get('Solution'), namespace.get(__entry_point__)
    if isinstance(solution_class, type): kind, target = 'class', solution_class
    elif callable(target): kind = 'function'
    else:
        functions = [obj for name, obj in namespace.items() if callable(obj) and not name.startswith('_') and name != 'Solution']
        if len(functions) != 1: raise Exception(f"Could not find '{__entry_point__}'. Define that function, or use class Solution with a '{__entry_point__}' method.")
        kind, target = 'function', functions[0]
    results = []
    for index, test_case in enumerate(json.loads(__test_cases_json__)):
        args, expected = test_case.get('input', []), normalize(test_case.get('expected'))
        try:
            function = getattr(target(), __entry_point__) if kind == 'class' else target
            actual = function(*copy.deepcopy(args)) if isinstance(args, list) else function(copy.deepcopy(args))
            actual = normalize(actual)
            results.append({'testIndex': index + 1, 'passed': matches(actual, expected), 'input': args, 'expected': expected, 'actual': actual, 'error': None})
        except Exception as test_error:
            results.append({'testIndex': index + 1, 'passed': False, 'input': args, 'expected': expected, 'error': str(test_error)})
    payload = {'success': True, 'allPassed': bool(results) and all(result['passed'] for result in results), 'results': results, 'stdout': _stdout.getvalue(), 'error': None}
except Exception as error:
    payload = {'success': False, 'allPassed': False, 'results': [], 'stdout': _stdout.getvalue(), 'error': str(error)}
finally:
    sys.stdout = _original_stdout
json.dumps(payload)
`);
    self.postMessage({ id, status: 'result', result: JSON.parse(raw) });
  } catch (error) {
    self.postMessage({ id, status: 'result', result: { success: false, allPassed: false, results: [], stdout: '', error: error?.message || String(error) } });
  }
};
