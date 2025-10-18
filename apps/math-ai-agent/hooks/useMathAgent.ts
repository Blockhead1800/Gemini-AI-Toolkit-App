import { useState, useCallback } from 'react';
import { type Message, type ImageFile } from '../types';
import { createChatSession } from '../services/geminiService';
import { type GenerateContentResponse, type Part, type Chat } from '@google/genai';

// Helper to convert File to a base64 Part for the Gemini API
const fileToGenerativePart = async (file: File): Promise<Part> => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type,
      },
    };
};

export const useMathAgent = () => {
    const [chat, setChat] = useState<Chat>(() => createChatSession());
    const [messages, setMessages] = useState<Message[]>([
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          parts: [{ text: "Hello! I'm Magent, your personal math AI assistant. How can I help you solve some problems today?" }],
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = useCallback(async (text: string, image?: ImageFile) => {
        setIsLoading(true);
        setError(null);

        const userMessageParts: any[] = [];
        if (text) userMessageParts.push({ text });
        if (image) userMessageParts.push({ image });

        const userMessage: Message = {
            id: crypto.randomUUID(),
            role: 'user',
            parts: userMessageParts,
        };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const apiMessageParts: Part[] = [];
            if (text) apiMessageParts.push({ text });
            if (image) apiMessageParts.push(await fileToGenerativePart(image.file));

            let response: GenerateContentResponse = await chat.sendMessage({ message: apiMessageParts });

            // Loop as long as the model wants to call tools. This handles chained tool calls.
            while (response.functionCalls && response.functionCalls.length > 0) {
                const toolCalls = response.functionCalls;
                
                // Display the assistant's thinking process (text + tool call requests)
                setMessages((prev) => [...prev, {
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    parts: [{ text: response.text, toolCalls }],
                }]);

                // "Execute" tools and display their UI outputs (e.g., the graph)
                const toolMessages: Message[] = toolCalls.map(call => ({
                    id: crypto.randomUUID(),
                    role: 'tool',
                    parts: [{ toolResult: { toolName: call.name, data: call.args } }]
                }));
                setMessages((prev) => [...prev, ...toolMessages]);

                // Prepare and send the tool execution results back to the model
                const functionResponseParts: Part[] = toolCalls.map(call => ({
                    functionResponse: {
                        name: call.name,
                        response: {
                           result: call.name === 'run_python'
                                ? call.args.code
                                : JSON.stringify(call.args)
                        }
                    }
                }));
                
                // Get the next response. The loop will continue if it also has tool calls.
                response = await chat.sendMessage({ message: functionResponseParts });
            }

            // After the loop, the response is the final summary.
            // We only care about its text content. Any tool calls here are ignored.
            if (response.text) {
                setMessages((prev) => [...prev, {
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    parts: [{ text: response.text }],
                }]);
            }

        } catch (e) {
            console.error(e);
            setError(e instanceof Error ? e.message : 'An unknown error occurred');
        } finally {
            setIsLoading(false);
        }
    }, [chat]);

    const clearChat = useCallback(() => {
        setChat(createChatSession());
        setMessages([
            {
              id: crypto.randomUUID(),
              role: 'assistant',
              parts: [{ text: "Hello! I'm Magent, your personal math AI assistant. How can I help you solve some problems today?" }],
            }
        ]);
        setIsLoading(false);
        setError(null);
    }, []);

    return { messages, isLoading, error, sendMessage, clearChat };
};
