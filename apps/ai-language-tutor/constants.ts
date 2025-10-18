
import { Level, Language, Languages } from './types';

export const LEVEL_OPTIONS: Level[] = [Level.Beginner, Level.Intermediate, Level.Advanced];

export const LANGUAGE_OPTIONS: Language[] = [...Languages];

export const LEVEL_DESCRIPTIONS: Record<Level, string> = {
  [Level.Beginner]: "Simple phrases, slow explanations, and translations.",
  [Level.Intermediate]: "Focus on sentence structure and grammar corrections.",
  [Level.Advanced]: "Fluent conversations, idioms, and natural corrections.",
};
