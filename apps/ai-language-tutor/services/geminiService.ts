
import { GoogleGenAI, Chat } from "@google/genai";
import { Language, Level } from '../types';

function createSystemPrompt(language: Language, level: Level): string {
  const basePrompt = `
You are an AI-powered language tutor. Your name is Kai.
Your goal is to help me learn ${language} in a friendly, encouraging, and conversational manner.
You must be patient and culturally aware. Avoid robotic phrasing.
Always respond in a structured, encouraging, and educational tone.
Remember my learning context for our entire conversation.
I may ask for translations, grammar explanations, or to practice conversations.
I can also ask for quizzes, like flashcards or fill-in-the-blank exercises.
  `.trim();

  let levelInstruction = '';
  switch (level) {
    case Level.Beginner:
      levelInstruction = `
My current level is Beginner.
- Use simple phrases and vocabulary.
- Explain things slowly and clearly.
- Provide English translations for key phrases or new vocabulary.
- When I make a mistake, gently correct me and provide a simple explanation. For example: "Good try! A more natural way to say that is... Here's why: ..."
      `.trim();
      break;
    case Level.Intermediate:
      levelInstruction = `
My current level is Intermediate.
- Focus on helping me build more complex sentences.
- Correct my grammar and sentence structure mistakes with clear explanations.
- Introduce new, relevant vocabulary and challenge me to use it.
- Engage me in conversation and ask follow-up questions to keep it going.
      `.trim();
      break;
    case Level.Advanced:
      levelInstruction = `
My current level is Advanced.
- Converse with me fluently, as you would with a native speaker.
- Correct my errors naturally, as a friend would, without long-winded explanations unless I ask.
- Introduce idiomatic expressions, slang, and culturally relevant phrases.
- Discuss more complex topics to challenge my fluency.
      `.trim();
      break;
  }

  return `${basePrompt}\n\n${levelInstruction}`;
}

export function startChatSession(language: Language, level: Level): Chat | null {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY environment variable not set.");
    return null;
  }
  
  const ai = new GoogleGenAI({ apiKey });
  const systemInstruction = createSystemPrompt(language, level);

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction,
    },
  });

  return chat;
}
