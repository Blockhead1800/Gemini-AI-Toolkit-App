import { type FunctionCall } from '@google/genai';
import React from 'react';
import { Code, Graph, Loader, Wolfram, CheckCircle } from './Icons';

interface ToolCallProps {
  functionCall: FunctionCall;
  isLoading: boolean;
}

const ToolCall: React.FC<ToolCallProps> = ({ functionCall, isLoading }) => {
  const { name, args } = functionCall;

  const getToolInfo = () => {
    switch (name) {
      case 'run_python':
        return {
          icon: <Code className="w-5 h-5 text-yellow-400" />,
          title: 'Using Python Runner',
        };
      case 'plot_desmos_graph':
        return {
          icon: <Graph className="w-5 h-5 text-green-400" />,
          title: 'Plotting Desmos Graph',
        };
      case 'query_wolfram_alpha':
        return {
          icon: <Wolfram className="w-5 h-5 text-orange-400" />,
          title: 'Querying Wolfram|Alpha',
        };
      default:
        return {
          icon: <Code className="w-5 h-5 text-slate-400" />,
          title: 'Using Tool',
        };
    }
  };

  const { icon, title } = getToolInfo();
  
  return (
    <div className="bg-slate-700/50 p-3 my-2 rounded-lg border border-slate-600">
      <div className="flex items-center text-sm font-semibold text-slate-300">
        {isLoading ? (
          <Loader className="w-4 h-4 mr-2 animate-spin"/>
        ) : (
          <CheckCircle className="w-4 h-4 mr-2 text-green-400"/>
        )}
        {icon}
        <span className="ml-2">{title}</span>
      </div>
      <pre className="mt-2 bg-slate-800/70 p-2 rounded text-xs text-slate-400 overflow-x-auto">
        <code>{JSON.stringify(args, null, 2)}</code>
      </pre>
    </div>
  );
};

export default ToolCall;