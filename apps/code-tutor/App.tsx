
import React, { useState, useCallback, useRef } from 'react';
import { TutorAction } from './types';
import { LANGUAGES, ACTIONS } from './constants';
import { runCodeTutor } from './services/geminiService';
import OutputDisplay from './components/OutputDisplay';
import { ExplainIcon, DebugIcon, OptimizeIcon, CommentIcon, CodeIcon, UploadIcon, Trash } from './components/icons';

const LanguageSelector: React.FC<{ language: string; setLanguage: (lang: string) => void; disabled: boolean }> = ({ language, setLanguage, disabled }) => (
  <div>
    <label htmlFor="language" className="block text-sm font-medium text-slate-400 mb-1">
      Language
    </label>
    <select
      id="language"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      disabled={disabled}
      className="w-full bg-slate-700 border border-slate-600 text-white rounded-md p-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>{lang}</option>
      ))}
    </select>
  </div>
);

const ActionButton: React.FC<{
    action: TutorAction;
    selectedAction: TutorAction | null;
    isLoading: boolean;
    onClick: () => void;
}> = ({ action, selectedAction, isLoading, onClick }) => {
    const icons: Record<TutorAction, React.ReactNode> = {
        [TutorAction.EXPLAIN]: <ExplainIcon />,
        [TutorAction.DEBUG]: <DebugIcon />,
        [TutorAction.OPTIMIZE]: <OptimizeIcon />,
        [TutorAction.ADD_COMMENTS]: <CommentIcon />,
    };
    
    const baseClasses = "flex items-center justify-center w-full p-3 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
    const disabledClasses = "disabled:opacity-50 disabled:cursor-not-allowed";
    const selectedClasses = "bg-sky-600 text-white shadow-lg";
    const unselectedClasses = "bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white";

    const isActive = isLoading && selectedAction === action;

    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={`${baseClasses} ${disabledClasses} ${selectedAction === action && !isLoading ? selectedClasses : unselectedClasses}`}
        >
            {isActive ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
                <>
                    {icons[action]}
                    {action}
                </>
            )}
        </button>
    );
};


const App: React.FC = () => {
  const [code, setCode] = useState<string>('function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}');
  const [language, setLanguage] = useState<string>('JavaScript');
  const [selectedAction, setSelectedAction] = useState<TutorAction | null>(null);
  const [output, setOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAction = useCallback(async (action: TutorAction) => {
    if (!code.trim()) {
      setError("Please enter some code before running an action.");
      setOutput('');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setSelectedAction(action);
    setOutput('');

    try {
      const result = await runCodeTutor(code, language, action);
      setOutput(result);
    } catch (e) {
      console.error("Caught error in handleAction:", e);
      setError(e instanceof Error ? e.message : "An unexpected error occurred during the action.");
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);
  
  const handleClear = () => {
    setCode('');
    setOutput('');
    setSelectedAction(null);
    setError(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
            setCode(text);
            setError(null); // Clear previous errors on successful load
        }
    };
    reader.onerror = () => {
        setError("Error: Failed to read the selected file.");
    };
    reader.readAsText(file);

    // Reset the input value to allow uploading the same file again
    event.target.value = '';
  };


  return (
    <div className="h-full text-slate-200 font-sans flex flex-col">
      <header className="bg-slate-800/50 backdrop-blur-sm p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center">
            <CodeIcon />
            <h1 className="text-2xl font-bold ml-3 bg-gradient-to-r from-sky-400 to-cyan-400 text-transparent bg-clip-text">
              Code Tutor
            </h1>
        </div>
        <button
          onClick={handleClear}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors disabled:opacity-50"
          aria-label="Clear code"
        >
          <Trash className="w-4 h-4" />
          Clear Code
        </button>
      </header>

      <main className="flex-grow container mx-auto p-4 flex flex-col md:flex-row gap-6 min-h-0">
        {/* Input Panel */}
        <div className="flex flex-col space-y-4 md:w-1/2">
          <LanguageSelector language={language} setLanguage={setLanguage} disabled={isLoading}/>
          
          <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Actions</label>
              <div className="grid grid-cols-2 gap-2">
                {ACTIONS.map((action) => (
                    <ActionButton
                        key={action}
                        action={action}
                        selectedAction={selectedAction}
                        isLoading={isLoading}
                        onClick={() => handleAction(action)}
                    />
                ))}
              </div>
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-1 flex-shrink-0">
                <label htmlFor="code-input" className="block text-sm font-medium text-slate-400">
                    Your Code
                </label>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".js,.ts,.py,.java,.cpp,.go,.rs,.php,.rb,.swift,.kt,.sql,.html,.css,.md,.txt"
                />
                <button
                    onClick={handleUploadClick}
                    disabled={isLoading}
                    className="flex items-center px-3 py-1 text-sm font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 disabled:opacity-50"
                >
                    <UploadIcon />
                    Upload File
                </button>
             </div>
            <textarea
              id="code-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isLoading}
              className="w-full h-96 bg-slate-700 border border-slate-600 text-slate-200 rounded-md p-4 font-mono text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition resize-none"
              placeholder="Enter your code here..."
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="md:w-1/2 bg-slate-800/50 border border-slate-700 rounded-lg p-6 overflow-y-auto">
          {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-md">{error}</div>}
          {!error && <OutputDisplay text={output} isLoading={isLoading} />}
        </div>
      </main>
    </div>
  );
}

export default App;