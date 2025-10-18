import React from 'react';

const PlaceholderApp2: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-4 sm:p-6">
      <div className="text-center mb-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text mb-2">
            Code Tutor App
          </h2>
          <p className="text-lg text-gray-300">
            This space could be used to build a Gemini-powered code assistant.
          </p>
      </div>

      <div className="flex-grow bg-gray-900/50 p-4 rounded-lg border border-gray-700 flex flex-col">
        <div className="flex-grow bg-gray-900 rounded-md p-4 font-mono text-sm text-gray-300 overflow-auto">
          <pre>
            <code>
{`function helloGemini() {
  console.log("Welcome to the Code Tutor!");
  // Ask Gemini to explain this code...
}`}
            </code>
          </pre>
        </div>
        <button className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
          Explain Code
        </button>
      </div>
    </div>
  );
};

export default PlaceholderApp2;
