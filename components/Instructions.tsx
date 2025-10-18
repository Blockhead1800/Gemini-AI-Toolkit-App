import React from 'react';
import { LightBulbIcon } from './icons';

const Instructions: React.FC = () => {
  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <div className="bg-gray-800/50 border border-dashed border-gray-600 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center border border-yellow-500/20">
            <LightBulbIcon className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-100 mb-3">How to Add Your Own App</h2>
            <p className="text-gray-400 mb-6">
              Follow these steps to add your newly created Gemini application to this toolkit.
            </p>
            <ol className="list-decimal list-inside space-y-4 text-gray-300">
              <li>
                <strong>Create Your App Component:</strong>
                <p className="text-gray-400 pl-2 mt-1">
                  Place your new app's component file (e.g., <code className="bg-gray-700 px-1.5 py-0.5 rounded-md text-sm text-yellow-300">MyAwesomeApp.tsx</code>) inside the <code className="bg-gray-700 px-1.5 py-0.5 rounded-md text-sm text-yellow-300">apps/</code> directory.
                </p>
              </li>
              <li>
                <strong>Register Your App:</strong>
                <p className="text-gray-400 pl-2 mt-1">
                  Open the file <code className="bg-gray-700 px-1.5 py-0.5 rounded-md text-sm text-yellow-300">apps/index.ts</code>. This is the central registry for all tools.
                </p>
              </li>
              <li>
                <strong>Import and Add to Array:</strong>
                <p className="text-gray-400 pl-2 mt-1">
                  First, import your new component at the top of <code className="bg-gray-700 px-1.5 py-0.5 rounded-md text-sm text-yellow-300">apps/index.ts</code>. Then, add a new object for your app to the `apps` array, filling in its details like `id`, `name`, `description`, and `component`.
                </p>
              </li>
            </ol>
             <p className="text-gray-400 mt-6 text-sm">
                That's it! Your new app will automatically appear on this page. For new icons, you can add them to <code className="bg-gray-700 px-1.5 py-0.5 rounded-md text-sm text-yellow-300">components/icons.tsx</code>.
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
