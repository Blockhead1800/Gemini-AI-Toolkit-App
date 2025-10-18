
import React from 'react';

interface StatusDisplayProps {
  status: string;
  error: string | null;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, error }) => {
  if (error) {
    return (
      <div className="flex-1 text-sm text-red-400">
        <p className="font-semibold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
     <div className="flex-1 text-sm text-slate-400">
        <p className="font-semibold">Status</p>
        <p>{status}</p>
      </div>
  );
};
