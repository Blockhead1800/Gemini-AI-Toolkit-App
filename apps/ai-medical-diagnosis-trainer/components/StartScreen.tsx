
import React from 'react';
import { GameStatus } from '../types';

interface StartScreenProps {
  onStart: () => void;
  status: GameStatus;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, status }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">AI Diagnosis Trainer</h1>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl">
          Hone your diagnostic skills. Press the button below to receive a new patient case, review their chart, and begin your investigation.
        </p>
        <button
          onClick={onStart}
          disabled={status === GameStatus.LOADING}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-all transform hover:scale-105 disabled:bg-slate-500 disabled:cursor-wait"
        >
          {status === GameStatus.LOADING ? 'Generating Case...' : 'Take Patient'}
        </button>
      </div>
    </div>
  );
};
