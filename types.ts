import React from 'react';

export interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export interface Project {
  name: string;
  tech: string[];
  description: string;
  live?: string;
  repo: string;
  thumbnail?: string;
}

export interface SkillCategory {
  [key: string]: string[];
}

export interface Themes {
  [key: string]: {
    background: string;
    prompt: string;
    text: string;
    output: string;
    scrollbarThumb?: string;
    border?: string;
  };
}

export type ThemeName = 'matrix' | 'ubuntu' | 'dracula' | 'solarized' | 'nord' | 'gruvbox' | 'cyberpunk' | 'light';

export type FormStep = 'idle' | 'name' | 'email' | 'message' | 'sending' | 'success' | 'error';

export interface FormState {
  step: FormStep;
  data: {
    name: string;
    email: string;
    message: string;
  };
}

export interface AnalyticsData {
  totalVisitors: number;
  todayVisitors: number;
  lastVisitDate: string; // YYYY-MM-DD
  commandCounts: { [key: string]: number };
  sessionStartTime: number; // timestamp
  totalSessionDuration: number; // in ms
  sessionCount: number;
}

export interface Certification {
  name: string;
  issuer?: string;
  url: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
}