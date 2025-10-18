import React, { useMemo } from 'react';
import { type Message as MessageType } from '../types';
import DesmosGraph from './DesmosGraph';
import PythonOutput from './PythonOutput';
import ToolCall from './ToolCall';
import { User, Bot } from './Icons';
import WolframAlphaOutput from './WolframAlphaOutput';

// --- Start of added markdown rendering logic ---

// Declare marked for TypeScript to recognize the global variable from the CDN script
declare const marked: {
  parse(markdown: string): string;
};

/**
 * A component that renders a string of text as markdown.
 * It assumes the `marked.js` library is loaded globally.
 */
const MarkdownContent: React.FC<{ text: string }> = ({ text }) => {
  const parsedHtml = useMemo(() => {
    if (typeof marked !== 'undefined') {
      try {
        return marked.parse(text);
      } catch (e) {
        console.error("Markdown parsing failed:", e);
        // Fallback for safety
        return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br />');
      }
    }
    // Fallback while script is loading
    return text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br />');
  }, [text]);
  
  return (
    <div
      className="prose prose-invert prose-p:my-1 prose-pre:bg-slate-900/70 prose-pre:p-3 prose-pre:rounded-md"
      dangerouslySetInnerHTML={{ __html: parsedHtml }}
    />
  );
};
// --- End of added markdown rendering logic ---


interface MessageProps {
  message: MessageType;
  isLoading: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isLoading }) => {
  const { role, parts } = message;

  if (role === 'tool') {
    return (
      <div className="my-4 flex justify-center" aria-label="Tool Output">
        <div className="w-full max-w-2xl">
          {parts.map((part, index) => (
            <div key={index}>
              {part.toolResult?.toolName === 'plot_desmos_graph' && (
                <DesmosGraph expressions={part.toolResult.data.expressions} />
              )}
              {part.toolResult?.toolName === 'run_python' && (
                <PythonOutput code={part.toolResult.data.code} />
              )}
              {part.toolResult?.toolName === 'query_wolfram_alpha' && (
                <WolframAlphaOutput query={part.toolResult.data.query} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  const containerClasses = role === 'user' ? 'flex justify-end' : 'flex justify-start';
  const bubbleClasses = role === 'user'
    ? 'bg-sky-600/70 text-white'
    : 'bg-slate-700/50 text-slate-200';
  
  const Icon = role === 'user' ? User : Bot;
  const iconClasses = role === 'user' ? 'text-sky-300' : 'text-slate-400';
  const bubbleAlignment = role === 'user' ? 'items-end' : 'items-start';

  const hasBubbleContent = parts.some(p => p.text || p.image);
  const allToolCalls = parts.flatMap(p => p.toolCalls || []);

  return (
    <div className={`${containerClasses} group`}>
        <div className="flex items-start space-x-3 max-w-full lg:max-w-4xl">
            {role === 'assistant' && (
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center ${iconClasses}`} aria-hidden="true">
                <Icon className="w-5 h-5"/>
              </div>
            )}
            
            <div className={`flex flex-col space-y-2 ${bubbleAlignment}`}>
              {hasBubbleContent && (
                <div className={`px-4 py-3 rounded-lg ${bubbleClasses}`}>
                  {parts.map((part, index) => (
                    <React.Fragment key={index}>
                      {part.text && (
                          <MarkdownContent text={part.text} />
                      )}
                      {part.image && (
                          <img src={part.image.preview} alt="User attachment" className="mt-2 rounded-lg max-w-xs max-h-64 object-cover"/>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
              {allToolCalls.map((call, callIndex) => (
                  <ToolCall key={callIndex} functionCall={call} isLoading={isLoading} />
              ))}
            </div>
        </div>
    </div>
  );
};

export default Message;