import { GoogleGenAI } from "@google/genai";
import type { Chat } from "@google/genai";
import type { CaseDetails } from '../types';

const SYSTEM_INSTRUCTION = `You are an AI law professor simulating a case study for a law student. Your persona is professional, encouraging, and follows the Socratic method. You will guide the student through a legal case you generate.

Your responsibilities:
1.  **Case Generation:** When first prompted, create a fictional legal case. You must secretly decide on a core legal issue (e.g., negligence, breach of contract, defamation). Then, create a 'Case File' with details and a 'Client's Statement' describing the situation from the client's perspective without revealing the legal conclusion.
2.  **Responding to Questions:** Answer the student's questions based on the facts of the case you have created. If a student asks about a fact you haven't determined, you can invent a plausible detail that fits the narrative. Keep your answers concise.
3.  **Guiding the Student:** After every 3 questions from the student, you MUST ask them: "Are you ready to state the primary legal issue and potential outcome? Or would you like to continue asking questions?".
4.  **Revealing the Analysis:** If the student indicates they are ready to guess or want to know the answer, ask for their thoughts first. Then, provide a detailed analysis. This should include: the key legal issue(s), the relevant legal principles/doctrines, and an application of those principles to the case facts to reach a likely conclusion.
5.  **Format Adherence:** Your very first response must be ONLY a valid JSON object as requested. All subsequent responses should be conversational text.
`;

class GeminiService {
  private chat: Chat | null = null;
  private ai: GoogleGenAI | null = null;
  private userQuestionCount: number = 0;

  private initializeAI() {
    if (!this.ai) {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
      }
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
  }

  public async startNewCase(): Promise<CaseDetails> {
    this.initializeAI();
    if (!this.ai) throw new Error("AI not initialized");
    
    this.userQuestionCount = 0;

    this.chat = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const prompt = "Generate a new legal case study. Your response must be ONLY a valid JSON object. The JSON should have two keys: 'caseFile' (an object with clientName, opposingParty, jurisdiction, caseType, dateOfIncident) and 'clientStatement' (a string). The 'clientStatement' string should ONLY contain the initial facts of the case from the client's perspective, as if they were speaking to their lawyer. It must not contain any greetings or direct address to the student/user. Do not include any other text, explanation, or markdown formatting around the JSON.";
    
    const result = await this.chat.sendMessage({ message: prompt });
    const jsonString = result.text.trim().replace(/```json|```/g, '');

    try {
      const parsedDetails: CaseDetails = JSON.parse(jsonString);
      return parsedDetails;
    } catch (error) {
      console.error("Failed to parse JSON response:", jsonString);
      throw new Error("The AI returned an invalid case format. Please try again.");
    }
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      throw new Error("Chat session not started. Call startNewCase first.");
    }

    this.userQuestionCount++;
    let finalMessage = message;

    if (this.userQuestionCount % 3 === 0) {
      finalMessage += "\n\n(System Note: This is my 3rd question. Remember to ask me if I'm ready to guess the outcome.)";
    }

    const result = await this.chat.sendMessage({ message: finalMessage });
    return result.text;
  }
  
  public async getFinalAnalysis(): Promise<string> {
    if (!this.chat) {
      throw new Error("Chat session not started. Call startNewCase first.");
    }
    const prompt = "The student has requested the final answer. Please provide your detailed analysis now, covering the primary legal issue, relevant legal principles, and how they apply to the facts of this case to reach a conclusion.";
    const result = await this.chat.sendMessage({ message: prompt });
    return result.text;
  }

  public endCase(): void {
    this.chat = null;
    this.userQuestionCount = 0;
  }
}

export const geminiService = new GeminiService();