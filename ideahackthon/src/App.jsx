import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Console } from './components/ui/console';
import { useAuth } from './hooks/useAuth';
import { useCollaboration } from './hooks/useCollaboration';
import { useAI } from './hooks/useAI';
import * as monaco from 'monaco-editor';
import image from './components/image.png';  // Import the logo image

export default function CodeEditor() {
  const { user, login, logout } = useAuth();
  const { code, setCode, users } = useCollaboration();
  const { aiSuggestions, fetchSuggestions } = useAI();
  const [theme, setTheme] = useState('vs-dark');
  const [fileName, setFileName] = useState('index.js');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [languages, setLanguages] = useState([]);

  // Dynamically import Monaco languages
  useEffect(() => {
    const loadLanguages = () => {
      monaco.languages.register({ id: 'javascript' });
      monaco.languages.register({ id: 'python' });
      monaco.languages.register({ id: 'java' });
      monaco.languages.register({ id: 'cpp' });

      setLanguages(['javascript', 'python', 'java', 'cpp']); // Example languages
    };

    loadLanguages();
  }, []);

  function executeCode() {
    try {
      let logs = [];
      const log = (...args) => logs.push(args.join(" "));
      const originalConsoleLog = console.log;
      console.log = log;

      // Use eval to run the code safely (only works for JavaScript code)
      eval(code); // This evaluates the code in the context of the current page

      setConsoleOutput(logs);
      console.log = originalConsoleLog;
    } catch (error) {
      setConsoleOutput([error.message]);
    }
  }

  return (
    <div className="flex h-screen p-4 bg-gray-900 text-white">
    <br/>
    <div className="absolute top-0 left-0 p-4">
      <img src={image} alt="Logo" style={{ height: '35px', width: '350px' }} className="object-contain" />
    </div>




      <div className="flex-1 flex flex-col pr-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-center">⚡ AI-Powered Code Editor</h1>
        </div>
        <Tabs defaultValue="editor">
          <TabsContent value="editor">
            <div className="mb-4">
              <Input value={fileName} onChange={(e) => setFileName(e.target.value)} className="mb-2" />
              {/* Language Selector */}
              <select
                className="bg-gray-800 text-white p-2 rounded-md"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {languages.map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div className="rounded-lg border-2 border-gray-700 overflow-hidden">
              <Editor
                height="60vh"
                theme={theme}
                language={language}
                value={code}
                onChange={(value) => setCode(value)}
                options={{ minimap: { enabled: false }, wordWrap: 'on', bracketPairColorization: true }}
              />
            </div>
            <Button onClick={executeCode} className="mt-4 bg-blue-600 hover:bg-blue-700">▶ Run Code</Button>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardContent>
                <Button onClick={fetchSuggestions} className="bg-purple-600 hover:bg-purple-700">✨ Get AI Suggestions</Button>
                <pre className="mt-2 p-2 bg-gray-800 text-green-300 rounded-md">{aiSuggestions || "No suggestions yet..."}</pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collab">
            <Card>
              <CardContent>
                <h2 className="font-semibold text-lg">👥 Live Collaboration</h2>
                <ul className="mt-2 space-y-1">
                  {users.map((u, index) => (
                    <li key={index} className="text-sm bg-gray-800 p-2 rounded-lg">{u.name} {u.id === user?.id ? "(You)" : ""}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Console Section on Right */}
      <div className="absolute top-0 right-0 w-1/3 h-full p-4 bg-gray-800">
      <h2>Console</h2>
        <TabsContent value="console">
          <Console output={consoleOutput} />
        </TabsContent>
      </div>
    </div>
  );
}
