import { GoogleGenAI } from "@google/genai";
import { TutorAction } from '../types';

const getActionPrompt = (action: TutorAction): string => {
  switch (action) {
    case TutorAction.EXPLAIN:
      return 'Thoroughly explain the following code snippet. Break it down line by line or by logical blocks. Explain the purpose, functionality, and any complex concepts used.';
    case TutorAction.DEBUG:
      return 'Analyze the following code snippet for bugs, errors, or potential issues. Provide a corrected version of the code and a clear explanation of what was wrong and how you fixed it.';
    case TutorAction.OPTIMIZE:
      return 'Optimize the following code for performance, readability, and best practices. Provide the optimized code and explain the changes you made and why they are improvements.';
    case TutorAction.ADD_COMMENTS:
      return 'Add comprehensive, line-by-line comments to the following code snippet to make it easier to understand. The comments should explain the purpose of each part of the code.';
    default:
      return 'Analyze the following code snippet.';
  }
};

export const runCodeTutor = async (
  code: string,
  language: string,
  action: TutorAction
): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is missing. Please make sure it is configured in the environment variables.");
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const promptAction = getActionPrompt(action);
    const fullPrompt = `${promptAction}\n\nLanguage: ${language}\n\nCode:\n\`\`\`${language.toLowerCase()}\n${code}\n\`\`\``;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: "You are an expert code tutor. You analyze code snippets and provide clear, concise, and helpful feedback. Format your responses using markdown, including fenced code blocks for examples.",
        temperature: 0.5,
        topP: 0.95,
      },
    });
    
    if (response.promptFeedback?.blockReason) {
      throw new Error(`The request was blocked due to safety settings. Reason: ${response.promptFeedback.blockReason}`);
    }
    
    const text = response.text;
    if (!text) {
        throw new Error("The AI returned an empty response. This might be due to a content policy or an internal error.");
    }

    return text;
  } catch (error) {
    console.error("Error in runCodeTutor:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Failed to get a response from the Code Tutor AI. Reason: ${message}`);
  }
};