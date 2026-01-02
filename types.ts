
export interface Word {
  id: number;
  term: string;
  phonetic: string;
  pos: string;
  definitionZh: string;
  definitionEn: string;
  exampleEn: string;
  exampleZh: string;
  derivatives: Derivative[];
  roots?: string;
}

export interface Derivative {
  word: string;
  pos: string;
  definition: string;
  example?: string;
}

export interface LearningState {
  isMastered: boolean;
  isHard: boolean;
  isFavorite: boolean;
  mistakeCount: number;
  lastReviewed?: number;
}

export type ViewMode = 'dashboard' | 'flashcards' | 'spelling' | 'derivatives' | 'cloze' | 'test' | 'mistakes';

export interface TestResult {
  date: number;
  score: number;
  total: number;
  mistakes: number[];
}
