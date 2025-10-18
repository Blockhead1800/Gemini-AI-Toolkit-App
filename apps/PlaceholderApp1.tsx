import React from 'react';

const PlaceholderApp1: React.FC = () => {
  return (
    <div className="flex flex-col h-full items-center justify-center p-8 text-center">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-300 to-blue-400 text-transparent bg-clip-text mb-4">
          Story Generator App
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          This is where the user interface for the Story Generator would be. You could have a text input for a prompt and a button to generate a story using the Gemini API.
        </p>
        <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 text-left">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-400 mb-2">
            Enter a prompt:
          </label>
          <input
            type="text"
            id="prompt"
            placeholder="e.g., A robot who dreams of being a chef"
            className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
            Generate Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderApp1;
