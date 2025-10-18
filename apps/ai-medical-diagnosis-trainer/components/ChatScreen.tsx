
import React, { useRef, useEffect } from 'react';
import type { ChatMessage, PatientProfile } from '../types';
import { PatientInfo } from './PatientInfo';
import { MessageBox } from './MessageBox';
import { ChatInput } from './ChatInput';

interface ChatScreenProps {
  patientProfile: PatientProfile;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onNewGame: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ patientProfile, messages, onSendMessage, isLoading, onNewGame }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex flex-col h-screen bg-slate-900">
        <header className="bg-slate-800/80 backdrop-blur-sm p-4 border-b border-slate-700 flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-xl font-semibold text-white">Patient Diagnosis Session</h1>
            <button
                onClick={onNewGame}
                className="bg-slate-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-700 transition-colors text-sm"
            >
                New Patient
            </button>
        </header>

      <div className="flex-grow overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
        <PatientInfo profile={patientProfile} />
        <div className="space-y-6">
          {messages.map((msg) => (
            <MessageBox key={msg.id} message={msg} />
          ))}
          {isLoading && (
              <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-slate-600 text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                  </div>
                  <div className="max-w-xl rounded-2xl px-4 py-3 shadow-md bg-slate-700 rounded-bl-none">
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></div>
                      </div>
                  </div>
              </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0">
          <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};
