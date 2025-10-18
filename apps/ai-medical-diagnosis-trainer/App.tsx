
import React, { useState, useCallback } from 'react';
import { GameStatus } from './types';
import type { AppState, ChatMessage } from './types';
import { startNewPatientSession, getInitialPatientData } from './services/geminiService';
import { StartScreen } from './components/StartScreen';
import { ChatScreen } from './components/ChatScreen';

const App: React.FC = () => {
    const [state, setState] = useState<AppState>({
        status: GameStatus.START,
        chatSession: null,
        patientProfile: null,
        messages: [],
        error: null,
    });

    const handleNewGame = useCallback(async () => {
        setState(s => ({ ...s, status: GameStatus.LOADING, error: null }));
        try {
            const chat = await startNewPatientSession();
            const { patientProfile, initialComplaint } = await getInitialPatientData(chat);

            setState({
                status: GameStatus.CHATTING,
                chatSession: chat,
                patientProfile: patientProfile,
                messages: [{ id: '0', sender: 'ai', text: initialComplaint }],
                error: null,
            });
        } catch (err) {
            const error = err instanceof Error ? err.message : "An unknown error occurred.";
            setState(s => ({ ...s, status: GameStatus.START, error }));
            alert(`Error: ${error}`);
        }
    }, []);

    const resetGame = useCallback(() => {
        setState({
            status: GameStatus.START,
            chatSession: null,
            patientProfile: null,
            messages: [],
            error: null,
        });
    }, []);

    const handleSendMessage = useCallback(async (messageText: string) => {
        if (!state.chatSession || state.status !== GameStatus.CHATTING) return;

        const newUserMessage: ChatMessage = { id: Date.now().toString(), sender: 'user', text: messageText };

        setState(s => ({
            ...s,
            messages: [...s.messages, newUserMessage],
            status: GameStatus.LOADING, // Technically AI is thinking
        }));

        try {
            const response = await state.chatSession.sendMessage({ message: messageText });
            const aiResponse: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: response.text };

            setState(s => ({
                ...s,
                messages: [...s.messages, aiResponse],
                status: GameStatus.CHATTING,
            }));
        } catch (err) {
            const error = err instanceof Error ? err.message : "Failed to get response from AI.";
            const errorResponse: ChatMessage = { id: (Date.now() + 1).toString(), sender: 'ai', text: `Sorry, I encountered an error: ${error}` };
             setState(s => ({
                ...s,
                messages: [...s.messages, errorResponse],
                status: GameStatus.CHATTING,
            }));
        }
    }, [state.chatSession, state.status, state.messages]);

    const isLoading = state.status === GameStatus.LOADING;

    if (state.status === GameStatus.START || state.status === GameStatus.LOADING && !state.patientProfile) {
        return <StartScreen onStart={handleNewGame} status={state.status} />;
    }

    if (state.patientProfile) {
        return (
            <ChatScreen
                patientProfile={state.patientProfile}
                messages={state.messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                onNewGame={resetGame}
            />
        );
    }
    
    return null; // Should not be reached
};

export default App;
