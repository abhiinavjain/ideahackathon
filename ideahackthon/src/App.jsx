import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { Console } from "./components/ui/console";
import { useAuth } from "./hooks/useAuth";
import { useCollaboration } from "./hooks/useCollaboration";
import { useAI } from "./hooks/useAI";
import * as monaco from "monaco-editor";
import image from "./components/image.png"; // Import logo image
import "./CodeEditor.css"; // Import the CSS file

export default function CodeEditor() {
  const { user, login, logout } = useAuth();
  const { code, setCode, users } = useCollaboration();
  const { aiSuggestions, fetchSuggestions } = useAI();
  const [theme, setTheme] = useState("vs-dark");
  const [fileName, setFileName] = useState("index.js");
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [language, setLanguage] = useState("javascript");
  const [languages, setLanguages] = useState(["javascript", "python", "java", "cpp"]);

  function executeCode() {
    try {
      let logs = [];
      const log = (...args) => logs.push(args.join(" "));
      const originalConsoleLog = console.log;
      console.log = log;

      eval(code); // Execute JS code

      setConsoleOutput(logs);
      console.log = originalConsoleLog;
    } catch (error) {
      setConsoleOutput([error.message]);
    }
  }

  return (
    <div className="container">
      {/* Logo */}
      <div className="logo">
        <img src={image} alt="Logo" />
      </div>

      {/* Main Code Editor Section */}
      <div className="editor-container">
        <div className="header">
          <h1>AI-Powered Code Editor</h1>
        </div>
        <div className="controls">
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Filename"
          />
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {languages.map((lang, index) => (
              <option key={index} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        <div className="editor">
          <Editor
            height="60vh"
            theme={theme}
            language={language}
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              wordWrap: "on",
              bracketPairColorization: true,
            }}
          />
        </div>
        <button className="run-btn" onClick={executeCode}>▶ Run Code</button>
      </div>

      {/* Console Section */}
      <div className="console">
        <h2>Console</h2>
        <Console output={consoleOutput} />
      </div>
    </div>
  );
}
