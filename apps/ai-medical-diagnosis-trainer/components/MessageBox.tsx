
import React from 'react';
import { AiIcon, UserIcon } from './icons';
import type { ChatMessage } from '../types';

interface MessageBoxProps {
  message: ChatMessage;
}

export const MessageBox: React.FC<MessageBoxProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isAi = message.sender === 'ai';

  const containerClasses = `flex items-start gap-4 ${isUser ? 'justify-end' : ''}`;
  const bubbleClasses = `max-w-xl rounded-2xl px-4 py-3 shadow-md ${
    isUser
      ? 'bg-blue-600 text-white rounded-br-none'
      : 'bg-slate-700 text-slate-200 rounded-bl-none'
  }`;
  const iconClasses = `flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
    isUser ? 'bg-blue-500 text-white' : 'bg-slate-600 text-slate-300'
  }`;

  const textContent = message.text.split('**').map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  );

  return (
    <div className={containerClasses}>
      {isAi && (
        <div className={iconClasses}>
          <AiIcon />
        </div>
      )}
      <div className={bubbleClasses}>
        <p className="text-sm leading-relaxed">{textContent}</p>
      </div>
      {isUser && (
        <div className={iconClasses}>
          <UserIcon />
        </div>
      )}
    </div>
  );
};
