let worker = null;
let requestId = 0;

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
  const startTime = performance.now();
  if (!userCode?.trim()) return failure('Code editor is empty. Please implement your solution before running.', startTime);

  const id = ++requestId;
  const activeWorker = getWorker();
  return new Promise((resolve) => {
    let timer = setTimeout(() => finish(failure('Python runtime loading timed out. Check your internet connection and try again.', startTime), true), 30000);

    const finish = (result, discardWorker = false) => {
      clearTimeout(timer);
      activeWorker.removeEventListener('message', onMessage);
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

    activeWorker.addEventListener('message', onMessage);
    activeWorker.postMessage({ id, userCode, testCases: testCases || [], entryPoint });
  });
}

function failure(error, startTime) {
  return { success: false, allPassed: false, results: [], stdout: '', executionTimeMs: Math.round((performance.now() - startTime) * 10) / 10, error };
}
