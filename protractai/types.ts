export interface RepoFile {
  name: string;
  path: string;
  download_url: string;
  type: 'file' | 'dir';
  content?: string;
}

export enum QuestionType {
  MultipleChoice = 'multiple_choice',
  MultipleSelect = 'multiple_select',
  ShortAnswer = 'short_answer',
  TrueFalse = 'true_false'
}

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[]; // For multiple_choice, multiple_select, and true_false
  correctAnswer: string | string[]; // String for MC/TF/SA, string array for MultipleSelect
  explanation?: string;
}

export interface Exam {
  title: string;
  description: string;
  questions: Question[];
}

export interface UserAnswer {
  questionId: number;
  answer: string | string[]; // String for single answer, array for multi-select
  isCorrect?: boolean; // For MC/TF auto-grading
  feedback?: string; // AI feedback for short answers
  score?: number; // 0-100 confidence score
}

export enum AppState {
  InputRepo,
  SelectingFiles,
  GeneratingExam,
  TakingExam,
  ReviewingResults
}
