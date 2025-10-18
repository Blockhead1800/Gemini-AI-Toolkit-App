import React, { useState } from 'react';
import type { CaseDetails } from './types';
import CaseView from './components/CaseView';
import { LawIcon } from './components/icons/LawIcon';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [caseDetails, setCaseDetails] = useState<CaseDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartCase = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const details = await geminiService.startNewCase();
      setCaseDetails(details);
    } catch (err) {
      console.error("Failed to start new case:", err);
      setError("Failed to generate a new case. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCase = () => {
    setCaseDetails(null);
    setError(null);
    geminiService.endCase();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {caseDetails ? (
        <CaseView initialDetails={caseDetails} onEndCase={handleEndCase} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center bg-slate-800 p-10 rounded-2xl shadow-2xl border border-slate-700">
            <LawIcon className="w-24 h-24 mx-auto mb-6 text-cyan-400" />
            <h1 className="text-5xl font-bold mb-3">Law Tutor</h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl">
              Sharpen your legal mind. Analyze a unique AI-generated case, interview the 'client', 
              and deduce the core legal issues before the AI professor reveals the analysis.
            </p>
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3 text-lg">
                <div className="w-6 h-6 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Generating your case...</span>
              </div>
            ) : (
              <button
                onClick={handleStartCase}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg"
              >
                Take a New Case
              </button>
            )}
            {error && <p className="text-red-400 mt-6">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;