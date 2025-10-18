
import React from 'react';
import type { AppDefinition } from '../types';

interface AppCardProps {
  app: AppDefinition;
  onSelect: () => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="group bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/80 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-start shadow-lg hover:shadow-blue-500/20"
    >
      <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center mb-4 border border-slate-600 group-hover:bg-blue-500/20 group-hover:border-blue-500 transition-colors">
        <div className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors">
          {app.icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-2">{app.name}</h3>
      <p className="text-slate-400 text-sm flex-grow">{app.description}</p>
    </div>
  );
};

export default AppCard;
