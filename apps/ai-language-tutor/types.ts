
export interface Message {
  role: 'user' | 'model';
  text: string;
}

export enum Level {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export const Languages = ['Spanish', 'French', 'German', 'Italian', 'Japanese', 'Korean', 'Mandarin Chinese', 'English (ESL)'] as const;
export type Language = typeof Languages[number];