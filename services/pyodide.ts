
declare global {
  interface Window {
    loadPyodide: any;
  }
}

let pyodideInstance: any = null;

export const initPyodide = async () => {
  if (pyodideInstance) return pyodideInstance;
  
  pyodideInstance = await window.loadPyodide();
  return pyodideInstance;
};

export const runPythonCode = async (code: string): Promise<{ output: string; error: string | null }> => {
  try {
    const pyodide = await initPyodide();
    
    // Capturing stdout
    await pyodide.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
    `);
    
    await pyodide.runPythonAsync(code);
    
    const output = await pyodide.runPythonAsync("sys.stdout.getvalue()");
    return { output, error: null };
  } catch (err: any) {
    return { output: "", error: err.message };
  }
};
