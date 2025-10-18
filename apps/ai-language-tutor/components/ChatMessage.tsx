import React, { useMemo } from 'react';
import { Message } from '../types';
import { UserIcon, SparklesIcon } from '../../../components/icons';

// Declare global variable for the 'marked' library loaded via CDN
declare const marked: {
  parse(markdown: string): string;
};

// Component to render markdown content safely
const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  const html = useMemo(() => {
    if (typeof marked !== 'undefined') {
      try {
        return marked.parse(content);
      } catch (e) {
        console.error("Markdown parsing failed:", e);
        return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
    }
    return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }, [content]);

  // Using Tailwind's typography plugin classes for styling
  return <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: html }} />;
};

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  const Avatar = () => (
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-sky-500' : 'bg-emerald-500'}`}>
      {isUser ? (
        <UserIcon className="w-5 h-5 text-white" />
      ) : (
        <SparklesIcon className="w-5 h-5 text-white" />
      )}
    </div>
  );

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && <Avatar />}
      <div className={`max-w-xl p-4 rounded-2xl ${isUser ? 'bg-sky-600 rounded-br-none' : 'bg-slate-700 rounded-bl-none'}`}>
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
          <MarkdownContent content={message.text} />
        )}
      </div>
      {isUser && <Avatar />}
    </div>
  );
};