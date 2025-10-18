
import React from 'react';
import ChatInterface from './components/ChatInterface';
import { BrainCircuit, Trash } from './components/Icons';
import { useMathAgent } from './hooks/useMathAgent';

const App: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearChat } = useMathAgent();

  return (
    <div className="flex flex-col flex-1 bg-slate-900 text-white font-sans">
      <header className="flex items-center justify-between p-4 border-b border-slate-700 shadow-md bg-slate-800/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center">
          <BrainCircuit className="w-8 h-8 text-sky-400" />
          <h1 className="ml-3 text-2xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 text-transparent bg-clip-text">
            Math AI Agent
          </h1>
        </div>
        <button
          onClick={clearChat}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
          aria-label="Clear chat"
        >
          <Trash className="w-4 h-4" />
          Clear Chat
        </button>
      </header>
      <main className="flex-1 min-h-0">
        <ChatInterface
          messages={messages}
          isLoading={isLoading}
          error={error}
          sendMessage={sendMessage}
        />
      </main>
    </div>
  );
};

export default App;
