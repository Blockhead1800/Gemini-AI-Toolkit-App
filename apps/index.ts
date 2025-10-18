//
// ===================================================================================
//
//  HOW TO ADD A NEW APP:
//
//  1. Import your new app component from its file.
//     e.g., import MyAwesomeApp from './MyAwesomeApp';
//
//  2. Create a new entry in the `apps` array below with the required details.
//     - id: A unique string for your app.
//     - name: The display name of your app.
//     - description: A short summary of what your app does.
//     - component: The imported component you created in step 1.
//     - icon: An icon for your app. You can add new icons in `components/icons.tsx`.
//
// ===================================================================================
//

import React from 'react';
import type { AppDefinition } from '../types';

// Step 1: Import your app components here
import LanguageTutorApp from './ai-language-tutor/App';
import CodeTutorApp from './code-tutor/App';
import MathAiAgentApp from './math-ai-agent/App';
import MedicalTutorApp from './ai-medical-diagnosis-trainer/App';
import TextToSpeechApp from './gemini-text-to-speech/App';
import LawTutorApp from './law-tutor/App';

import {
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  BrainCircuitIcon,
  HeartPulseIcon,
  SpeakerWaveIcon,
  LawIcon,
} from '../components/icons';


// Step 2: Add your app's definition to this array
export const apps: AppDefinition[] = [
  {
    id: 'ai-language-tutor',
    name: 'AI Language Tutor',
    description: "Practice speaking, get grammar explanations, and receive personalized feedback in a variety of languages with Kai, your friendly AI-powered tutor.",
    component: LanguageTutorApp,
    icon: React.createElement(ChatBubbleLeftRightIcon, {}),
  },
  {
    id: 'code-tutor',
    name: 'Code Tutor',
    description: 'Accelerate your learning with an AI code assistant. Get instant explanations, debugging help, and optimizations for your code, powered by the speed of Gemini Flash.',
    component: CodeTutorApp,
    icon: React.createElement(CodeBracketIcon, {}),
  },
  {
    id: 'math-ai-agent',
    name: 'Math AI Agent',
    description: "Meet Magent, an AI agent that solves complex math problems. It understands images, executes Python code, queries Wolfram|Alpha, and generates Desmos graphs.",
    component: MathAiAgentApp,
    icon: React.createElement(BrainCircuitIcon, {}),
  },
  {
    id: 'ai-medical-diagnosis-trainer',
    name: 'AI Medical Diagnosis Trainer',
    description: "An AI-powered chat application for medical students to practice diagnosing patients. The app presents a patient profile and symptoms, and the student must ask questions to determine the underlying medical condition.",
    component: MedicalTutorApp,
    icon: React.createElement(HeartPulseIcon, {}),
  },
  {
    id: 'gemini-text-to-speech',
    name: 'Gemini Text-to-Speech',
    description: "A text-to-speech application that uses the Gemini API to generate and play speech from user-provided text. Users can select from several different voices.",
    component: TextToSpeechApp,
    icon: React.createElement(SpeakerWaveIcon, {}),
  },
  {
    id: 'law-tutor',
    name: 'Law Tutor',
    description: "An AI-powered chat application for law students. Take on a fictional case, analyze the facts presented by an AI law professor, ask clarifying questions, and try to determine the key legal issues and outcome.",
    component: LawTutorApp,
    icon: React.createElement(LawIcon, {}),
  },
];
