import React from 'react';
import { Wolfram } from './Icons';

interface WolframAlphaOutputProps {
  query: string;
}

const WolframAlphaOutput: React.FC<WolframAlphaOutputProps> = ({ query }) => {
  return (
    <div className="mt-2 bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-700">
      <div className="flex items-center mb-3">
        <Wolfram className="w-5 h-5 text-orange-400 mr-2" />
        <h3 className="font-semibold text-slate-200">Wolfram|Alpha Query</h3>
      </div>
      <pre className="bg-black/50 p-4 rounded-md text-sm text-amber-200 overflow-x-auto">
        <code>{query}</code>
      </pre>
    </div>
  );
};

export default WolframAlphaOutput;