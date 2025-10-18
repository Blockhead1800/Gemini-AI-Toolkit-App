
import React from 'react';
import { SpeakerIcon } from './icons/SpeakerIcon';

export const Header: React.FC = () => {
  return (
    <div className="text-center">
       <div className="flex items-center justify-center gap-3 mb-2">
        <SpeakerIcon />
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Gemini Text-to-Speech
        </h1>
      </div>
      <p className="text-slate-400">
        Enter text, choose a voice, and hear it spoken aloud.
      </p>
    </div>
  );
};
