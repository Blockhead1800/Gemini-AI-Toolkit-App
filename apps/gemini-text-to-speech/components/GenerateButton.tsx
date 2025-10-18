import React from 'react';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { PlayIcon } from './icons/PlayIcon';


interface GenerateButtonProps {
  isLoading: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ isLoading, onClick, disabled }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading || disabled}
      className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-colors disabled:bg-indigo-400 disabled:cursor-wait disabled:opacity-70"
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          Generating...
        </>
      ) : (
        <>
          <PlayIcon />
          Generate Speech
        </>
      )}
    </button>
  );
};