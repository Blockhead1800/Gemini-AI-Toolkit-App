
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function startNewPatientSession(): Promise<Chat> {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_PROMPT,
        },
    });
    return chat;
}

export async function getInitialPatientData(chat: Chat): Promise<{ patientProfile: any; initialComplaint: string }> {
    try {
        const response = await chat.sendMessage({ message: "Start" });
        const jsonText = response.text.replace(/```json|```/g, '').trim();
        const data = JSON.parse(jsonText);
        
        if (!data.patientProfile || !data.initialComplaint) {
            throw new Error("Invalid initial data format from AI.");
        }
        return data;
    } catch (error) {
        console.error("Failed to parse initial patient data:", error);
        throw new Error("Could not get a valid patient case from the AI. Please try again.");
    }
}
