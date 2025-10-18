
import type { Chat } from "@google/genai";

export enum GameStatus {
  START,
  LOADING,
  CHATTING,
  ENDED,
}

export interface PatientProfile {
  age: number;
  sex: 'Male' | 'Female';
  height: string;
  weight: string;
  pastMedications: string[];
  pastMedicalHistory: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export interface AppState {
    status: GameStatus;
    chatSession: Chat | null;
    patientProfile: PatientProfile | null;
    messages: ChatMessage[];
    error: string | null;
}
