
import React, { useState, useRef, useEffect } from 'react';
import { Message, Language, Level } from '../types';
import { ChatMessage } from './ChatMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { SendIcon, SparklesIcon, ChatBubbleLeftRightIcon } from '../../../components/icons';
import { Trash } from '../../code-tutor/components/icons';


interface ChatScreenProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  language: Language;
  level: Level;
  onReset: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ messages, onSendMessage, isLoading, language, level, onReset }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-slate-800">
      <header className="bg-slate-800/50 backdrop-blur-sm p-4 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-sky-400" />
            <div className="ml-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 text-transparent bg-clip-text">
                Language Tutor
              </h1>
              <p className="text-xs text-slate-400">
                Learning: <span className="font-semibold text-slate-300">{language}</span> | Level: <span className="font-semibold text-slate-300">{level}</span>
              </p>
            </div>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
          aria-label="Clear chat"
        >
          <Trash className="w-4 h-4" />
          Clear Chat
        </button>
      </header>
      
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && messages[messages.length-1].role === 'user' && (
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-emerald-500">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-xl p-4 rounded-2xl bg-slate-700 rounded-bl-none">
                <LoadingSpinner />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-slate-800/50 backdrop-blur-sm p-4 border-t border-slate-700">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center gap-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message or ask a question..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 disabled:bg-slate-600 disabled:cursor-not-allowed p-3 rounded-full text-white transition-all transform hover:scale-110"
            disabled={isLoading || !inputText.trim()}
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </footer>
    </div>
  );
};
