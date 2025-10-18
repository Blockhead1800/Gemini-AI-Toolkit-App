
import React, { useState } from 'react';
import { Language, Level } from '../types';
import { LEVEL_OPTIONS, LANGUAGE_OPTIONS, LEVEL_DESCRIPTIONS } from '../constants';

interface SetupScreenProps {
  onStart: (language: Language, level: Level) => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGE_OPTIONS[0]);
  const [selectedLevel, setSelectedLevel] = useState<Level>(LEVEL_OPTIONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(selectedLanguage, selectedLevel);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl p-8 transform transition-all">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-sky-400">AI Language Tutor</h1>
          <p className="text-slate-400 mt-2">Choose your learning path to get started.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold mb-3 text-slate-300">I want to learn...</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {LANGUAGE_OPTIONS.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLanguage(lang)}
                  className={`p-4 rounded-lg text-center font-semibold transition-all duration-200 ${
                    selectedLanguage === lang
                      ? 'bg-sky-500 text-white ring-2 ring-sky-300 shadow-lg'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-3 text-slate-300">My current level is...</label>
            <div className="space-y-3">
              {LEVEL_OPTIONS.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                   className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center ${
                    selectedLevel === level
                      ? 'bg-slate-700 border-sky-500'
                      : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full mr-4 ${selectedLevel === level ? 'bg-sky-500' : 'bg-slate-500'}`}></div>
                  <div>
                    <p className="font-semibold text-slate-100">{level}</p>
                    <p className="text-sm text-slate-400">{LEVEL_DESCRIPTIONS[level]}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg py-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg"
          >
            Start Learning
          </button>
        </form>
      </div>
    </div>
  );
};
