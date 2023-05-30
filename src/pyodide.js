import { loadPyodide } from "pyodide";

export var Pyodide = (function () {
  var instance;
  function createInstance() {
    var object = new PythonRunner();
    return object;
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

class PythonRunner {
  constructor() {
    this._output = console.log;
    this._input = null;
    this._pyodide = null;
    const enc = new TextEncoder();

    loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.2/full",
      stderr: (text) => {
        this._output(text);
      },
      stdout: (text) => {
        this._output(text);
      },
    }).then((result) => {
      this._pyodide = result;

      this._pyodide.setStdin({
        stdin: () => {
          const temp = this._input;
          this._input = null;
          console.log("wowza", temp);
          if (temp === null) {
            return null;
          }
          return enc.encode(temp);
        },
        autoEOF: true,
        isatty: true,
      });

      console.log(
        this._pyodide.runPython(`
            import sys
            sys.version
        `)
      );
      this._pyodide.runPython('print("Hello from Python!")');
    });
  }
  reset() {
    this._pyodide.runPython(`
    import sys
    sys.stdin.read()
    globals().clear()
    `);
  }

  setInput(input) {
    this._input = input;
  }
  setOutput(output) {
    this._output = output;
  }
  run(code) {
    if (this._pyodide) {
      this._pyodide
        .runPythonAsync(code)
        .then(() => {})
        .catch((err) => {
          var lines = err.message.split("\n");
          let to = 1;
          for (const [i, l] of lines.entries()) {
            if (l.includes('File "<exec>"')) {
              to = i;
              break;
            }
          }
          lines.splice(1, to - 1);
          var newtext = lines.join("\n");
          this._output(newtext);
          return { error: newtext };
        });
      return out;
    }
  }
}
