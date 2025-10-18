
import React, { useState, useCallback } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { ChatScreen } from './components/ChatScreen';
import { startChatSession } from './services/geminiService';
import { Language, Level, Message } from './types';
import type { Chat } from '@google/genai';

const getGreeting = (lang: Language): string => {
  switch (lang) {
    case 'Spanish':
      return '¡Hola!';
    case 'French':
      return 'Bonjour !';
    case 'Japanese':
      return 'こんにちは！';
    case 'German':
      return 'Hallo!';
    case 'Italian':
      return 'Ciao!';
    case 'Korean':
      return '안녕하세요!';
    case 'Mandarin Chinese':
      return '你好！';
    case 'English (ESL)':
      return 'Hello!';
    default:
      return 'Hello!';
  }
};

function App() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [language, setLanguage] = useState<Language>('Spanish');
  const [level, setLevel] = useState<Level>(Level.Beginner);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetSession = useCallback(() => {
    setIsConfigured(false);
    setChatSession(null);
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);
  
  const handleStart = useCallback((lang: Language, lvl: Level) => {
    setLanguage(lang);
    setLevel(lvl);
    setIsLoading(true);
    try {
      const session = startChatSession(lang, lvl);
      if (session) {
        setChatSession(session);
        setIsConfigured(true);
        setMessages([
          { role: 'model', text: `${getGreeting(lang)} I'm Kai, your AI tutor for ${lang}. I'm ready to help you learn. What would you like to start with today?` }
        ]);
      } else {
        setError("Failed to start chat session. Please ensure your API key is set up correctly.");
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while initializing the chat.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!chatSession) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const stream = await chatSession.sendMessageStream({ message: text });
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse };
          return newMessages;
        });
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setMessages(prev => [...prev, { role: 'model', text: `Sorry, I encountered an error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  }, [chatSession]);

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-900 p-4 text-center">
        <h2 className="text-2xl text-red-500 font-bold mb-4">An Error Occurred</h2>
        <p className="text-slate-300 mb-6">{error}</p>
        <button
          onClick={resetSession}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!isConfigured) {
    return <SetupScreen onStart={handleStart} />;
  }

  return <ChatScreen 
            messages={messages} 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            language={language}
            level={level}
            onReset={resetSession}
         />;
}

export default App;