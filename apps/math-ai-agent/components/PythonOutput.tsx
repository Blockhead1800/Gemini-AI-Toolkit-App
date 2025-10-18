
import React from 'react';
import { Code } from './Icons';

interface PythonOutputProps {
  code: string;
}

const PythonOutput: React.FC<PythonOutputProps> = ({ code }) => {
  return (
    <div className="mt-2 bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-700">
      <div className="flex items-center mb-3">
        <Code className="w-5 h-5 text-yellow-400 mr-2" />
        <h3 className="font-semibold text-slate-200">Python Code Executed</h3>
      </div>
      <pre className="bg-black/50 p-4 rounded-md text-sm text-cyan-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default PythonOutput;
