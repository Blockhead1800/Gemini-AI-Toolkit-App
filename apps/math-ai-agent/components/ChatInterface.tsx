
import React, { useRef, useEffect, useState } from 'react';
import { type Message, type ImageFile } from '../types';
import InputBar from './InputBar';
import MessageComponent from './Message';
import { Loader } from './Icons';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (text: string, image?: ImageFile) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, error, sendMessage }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInputVisible, setIsInputVisible] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsInputVisible(true);
    }, 100); // Small delay for the animation to be noticeable
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (text: string, image?: ImageFile) => {
    if (isLoading || (!text.trim() && !image)) return;
    sendMessage(text, image);
  };

  return (
    <div className="flex flex-col h-full bg-slate-800/30">
      <div
        ref={scrollRef}
        className="flex-1 px-6 pt-2 pb-6 space-y-6 overflow-y-auto custom-scrollbar"
      >
        {messages.map((msg) => (
          <MessageComponent key={msg.id} message={msg} isLoading={isLoading} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
              <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 max-w-2xl">
                  <Loader className="w-5 h-5 animate-spin text-sky-400" />
                  <span className="text-slate-300">Magent is thinking...</span>
              </div>
          </div>
        )}
      </div>
      <div className={`p-4 border-t border-slate-700 bg-slate-800/50 transition-all duration-500 ease-out ${isInputVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {error && <p className="text-red-400 text-center mb-2">{error}</p>}
        <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
