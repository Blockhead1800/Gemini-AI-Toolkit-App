import React, { useState, useRef, useEffect } from 'react';
import type { CaseDetails, ChatMessage } from '../types';
import { geminiService } from '../services/geminiService';
import { PaperClipIcon } from './icons/PaperClipIcon';
import { SendIcon } from './icons/SendIcon';

interface CaseViewProps {
  initialDetails: CaseDetails;
  onEndCase: () => void;
}

// A simple component to render text with **bold** markdown.
const MarkdownText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split('**');
  return (
    <>
      {parts.map((part, index) => 
        index % 2 === 1 
          ? <strong key={index}>{part}</strong> 
          : <span key={index}>{part}</span>
      )}
    </>
  );
};

const CaseView: React.FC<CaseViewProps> = ({ initialDetails, onEndCase }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      sender: 'ai', 
      text: `Please review the following client statement and the case file. Once you are ready, you may begin asking questions.\n\n---\n\n**Client's Statement:**\n${initialDetails.clientStatement}` 
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (userInput.trim() === '' || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponse = await geminiService.sendMessage(userInput);
      setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { sender: 'ai', text: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevealAnalysis = async () => {
    if (isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: "I'm ready for the analysis." }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const aiResponse = await geminiService.getFinalAnalysis();
      setMessages([...newMessages, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error("Error getting final analysis:", error);
      setMessages([...newMessages, { sender: 'ai', text: "Sorry, I encountered an error while generating the analysis." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-900 overflow-hidden">
      {/* Case File Panel */}
      <div className="w-full md:w-1/3 xl:w-1/4 bg-slate-800 p-6 shadow-2xl overflow-y-auto border-r border-slate-700">
        <div className="flex items-center mb-6">
          <PaperClipIcon className="w-8 h-8 text-cyan-400 mr-3" />
          <h2 className="text-3xl font-bold text-white">Case File</h2>
        </div>
        <div className="space-y-4 text-slate-300">
          {Object.entries(initialDetails.caseFile).map(([key, value]) => (
            <div key={key} className="bg-slate-700 p-3 rounded-lg">
              <p className="text-sm font-semibold text-cyan-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              <p className="text-lg text-white">{value}</p>
            </div>
          ))}
        </div>
         <button
            onClick={handleRevealAnalysis}
            disabled={isLoading}
            className="w-full mt-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            Reveal Analysis
        </button>
         <button
            onClick={onEndCase}
            disabled={isLoading}
            className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            End Case & Start New
        </button>
      </div>

      {/* Chat Panel */}
      <div className="flex flex-col flex-1 h-full">
        {/* Chat Header */}
        <div className="p-4 bg-slate-800 border-b border-slate-700 shadow-md">
          <h3 className="text-xl font-bold text-white">Case Consultation</h3>
          <p className="text-sm text-slate-400">Case of: {initialDetails.caseFile.clientName}</p>
        </div>

        {/* Message List */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-cyan-400 flex-shrink-0 text-xl shadow-inner">P</div>}
                <div className={`max-w-2xl p-4 rounded-2xl shadow-md ${msg.sender === 'user' ? 'bg-cyan-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'}`}>
                  <div className="whitespace-pre-wrap">
                    <MarkdownText text={msg.text} />
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex items-end gap-3 justify-start">
                 <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-cyan-400 flex-shrink-0 text-xl shadow-inner">P</div>
                 <div className="max-w-xl p-4 rounded-2xl bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                 </div>
               </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-800 border-t border-slate-700">
          <div className="flex items-center bg-slate-700 rounded-xl p-2 shadow-inner focus-within:ring-2 focus-within:ring-cyan-500 transition-all">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question or propose your analysis..."
              className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none px-4"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || userInput.trim() === ''}
              className="bg-cyan-500 text-white p-3 rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed hover:bg-cyan-400 transition-colors transform hover:scale-105"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseView;