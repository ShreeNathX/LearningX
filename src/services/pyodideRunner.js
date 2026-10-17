let worker = null;
let requestId = 0;
let executionQueue = Promise.resolve();
let runGeneration = 0;
let cancelActiveRun = null;

export function cancelPythonRuns() {
  runGeneration += 1;
  cancelActiveRun?.();
}

function getWorker() {
  if (worker) return worker;
  worker = new Worker(new URL('../workers/pythonRunner.worker.js', import.meta.url), { type: 'classic' });
  worker.onerror = () => resetWorker();
  return worker;
}

function resetWorker() {
  worker?.terminate();
  worker = null;
}

export async function runPythonCode(userCode, testCases, entryPoint = '') {
  if (!userCode?.trim()) return failure('Code editor is empty. Please implement your solution before running.', performance.now());

  const generation = runGeneration;
  const run = () => runQueuedPythonCode(userCode, testCases, entryPoint, performance.now(), generation);
  const result = executionQueue.then(run, run);
  executionQueue = result.then(() => undefined, () => undefined);
  return result;
}

function runQueuedPythonCode(userCode, testCases, entryPoint, startTime, generation) {
  if (generation !== runGeneration) return Promise.resolve(failure('Execution cancelled because the problem changed.', startTime));
  const id = ++requestId;
  const activeWorker = getWorker();
  return new Promise((resolve) => {
    let timer = setTimeout(() => finish(failure('Python runtime loading timed out. Check your internet connection and try again.', startTime), true), 30000);

    const finish = (result, discardWorker = false) => {
      clearTimeout(timer);
      activeWorker.removeEventListener('message', onMessage);
      activeWorker.removeEventListener('error', onError);
      if (cancelActiveRun === cancel) cancelActiveRun = null;
      if (discardWorker) resetWorker();
      resolve(result);
    };

    const onMessage = ({ data }) => {
      if (data.id !== id) return;
      if (data.status === 'executing') {
        clearTimeout(timer);
        timer = setTimeout(() => finish(failure('Execution timed out (5 seconds). Check for an infinite loop.', startTime), true), 5000);
      } else if (data.status === 'result') {
        finish({ ...data.result, executionTimeMs: Math.round((performance.now() - startTime) * 10) / 10 });
      }
    };

    const onError = () => finish(failure('The Python worker stopped unexpectedly. Reload the page and try again.', startTime), true);
    const cancel = () => finish(failure('Execution cancelled because the problem changed.', startTime), true);

    activeWorker.addEventListener('message', onMessage);
    activeWorker.addEventListener('error', onError);
    cancelActiveRun = cancel;
    activeWorker.postMessage({ id, userCode, testCases: testCases || [], entryPoint });
  });
}

function failure(error, startTime) {
  return { success: false, allPassed: false, results: [], stdout: '', executionTimeMs: Math.round((performance.now() - startTime) * 10) / 10, error };
}
