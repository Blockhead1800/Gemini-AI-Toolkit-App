import { type FunctionCall } from "@google/genai";

export type Role = "user" | "assistant" | "tool";

export interface MessagePart {
  text?: string;
  toolCalls?: FunctionCall[];
  toolResult?: ToolResult;
  image?: ImageFile;
}

export interface Message {
  id: string;
  role: Role;
  parts: MessagePart[];
}

export interface ToolResult {
  toolName: string;
  data: any;
  isError?: boolean;
}

export interface ImageFile {
  file: File;
  preview: string;
}
