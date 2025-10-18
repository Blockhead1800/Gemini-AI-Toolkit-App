
import React from 'react';

interface TextAreaProps {
  value: string;
  onChange: (text: string) => void;
  disabled: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({ value, onChange, disabled }) => {
  return (
    <div>
      <label htmlFor="text-input" className="block text-sm font-medium text-slate-400 mb-2">
        Enter Text
      </label>
      <textarea
        id="text-input"
        rows={6}
        className="block w-full bg-slate-700 border-slate-600 text-white rounded-md shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-y disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Type or paste your text here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};
