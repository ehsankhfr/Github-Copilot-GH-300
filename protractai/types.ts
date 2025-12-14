export interface RepoFile {
  name: string;
  path: string;
  download_url: string;
  type: 'file' | 'dir';
  content?: string;
}

export enum QuestionType {
  MultipleChoice = 'multiple_choice',
  ShortAnswer = 'short_answer',
  TrueFalse = 'true_false'
}

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[]; // Only for multiple_choice
  correctAnswer: string; // For MC/TF this is the exact string. For ShortAnswer, this is the grading rubric/key points.
  explanation?: string;
}

export interface Exam {
  title: string;
  description: string;
  questions: Question[];
}

export interface UserAnswer {
  questionId: number;
  answer: string;
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
