
import React, { useState } from 'react';
import type { AppDefinition } from './types';
import { apps } from './apps';
import AppCard from './components/AppCard';
import { ArrowLeftIcon } from './components/icons';

const App: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<AppDefinition | null>(null);

  const handleSelectApp = (app: AppDefinition) => {
    setSelectedApp(app);
  };

  const handleGoBack = () => {
    setSelectedApp(null);
  };

  const AppSelector: React.FC = () => (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Gemini AI Toolkit
          </span>
        </h1>
        <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
          A hub of strong AI powered learning tools
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} onSelect={() => handleSelectApp(app)} />
        ))}
      </div>
    </div>
  );

  const AppViewer: React.FC<{ app: AppDefinition }> = ({ app }) => {
    const AppComponent = app.component;
    return (
      <div className="w-full max-w-7xl mx-auto animate-fade-in flex flex-col flex-grow">
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium text-blue-400 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex-shrink-0 self-start"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Toolkit
        </button>
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex-grow flex flex-col">
           <AppComponent />
        </div>
      </div>
    );
  };
  
  return (
    <main className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-6 lg:p-8 flex flex-col">
      {selectedApp ? <AppViewer app={selectedApp} /> : <AppSelector />}
    </main>
  );
};

export default App;