import { useState } from "react";
import "./App.css";

import { Pyodide } from "./pyodide";
import Editor from "@monaco-editor/react";

import Split from "react-split";

function App() {
  const [pyprompt, setPyprompt] = useState(`import sys
data = sys.stdin.read().split('\\n')
print(data)`);
  const [pyoutput, setPyoutput] = useState(null);
  const [input, setInput] = useState(null);
  const pyodide = Pyodide.getInstance();

  function run() {
    pyodide.setOutput((text) => {
      setPyoutput((prevOuput) => (prevOuput ? prevOuput + "\n" + text : text));
    });
    pyodide.setInput(input);
    console.log("clicked", pyprompt);
    pyodide.run(pyprompt);
    pyodide.reset();
  }

  function clearOutput() {
    setPyoutput("");
  }

  function clearInput() {
    setInput("");
  }

  return (
    <>
        <Split className="absolute inset-0" direction="vertical">
          <Split className="flex flex-direction-col" direction="horizontal">
            <div className="not-prose relative">
              <Editor
                defaultLanguage="python"
                theme="vs-dark"
                onChange={(value) => {
                  setPyprompt(value);
                }}
                value={pyprompt}
                IndentOutdent={4}
              />
              <div className="absolute bottom-2 right-6 float-right flex items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 fill-green-500 hover:fill-green-200"
                  onClick={run}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="absolute bottom-2 left-2 text-blue-400">Code</div>
            </div>
            <div className="not-prose relative">
              <Editor
                theme="vs-dark"
                onChange={(value) => {
                  setInput(value);
                }}
                value={input}
                IndentOutdent={4}
                autoLayout={true}
              />
              <div className="absolute bottom-2 right-6 float-right flex items-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 fill-red-400 hover:fill-red-300"
                  onClick={clearInput}
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div className=" absolute bottom-2 left-2 text-blue-400">Input</div>
            </div>
          </Split>
          <div className="not-prose relative">
            <Editor
              theme="vs-dark"
              value={pyoutput}
              IndentOutdent={4}
              autoLayout={true}
              lineNumbers="off"
              options={{ lineNumbers: "off", readOnly: true }}
            />
            <div className="absolute bottom-2 right-6 float-right flex items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 fill-red-400 hover:fill-red-300"
                onClick={clearOutput}
              >
                <path
                  fill-rule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div className="absolute bottom-2 left-2 text-blue-400">Output</div>
          </div>
        </Split>
    </>
  );
}

export default App;
