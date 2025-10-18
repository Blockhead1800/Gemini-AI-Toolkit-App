import type React from 'react';

export interface AppDefinition {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
  icon: React.ReactNode;
}
