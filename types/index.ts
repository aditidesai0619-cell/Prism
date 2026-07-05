export type Dimension =
  | "Historical"
  | "Social"
  | "Economic"
  | "Political"
  | "Constitutional"
  | "Governance"
  | "Ethical"
  | "Philosophical"
  | "Environmental"
  | "Technological"
  | "International"
  | "Gender"
  | "Security"
  | "Cultural";

export const ALL_DIMENSIONS: Dimension[] = [
  "Historical",
  "Social",
  "Economic",
  "Political",
  "Constitutional",
  "Governance",
  "Ethical",
  "Philosophical",
  "Environmental",
  "Technological",
  "International",
  "Gender",
  "Security",
  "Cultural",
];

export interface Evaluation {
  id: string;
  created_at: string;
  question: string;
  word_limit: number;
  answer_text: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  overall_feedback: string;
  covered_dimensions: string[];
  missing_dimensions: string[];
  ideal_structure: string;
  word_economy: string;
  version_number: number;
  parent_id?: string | null;
}

export interface EvaluationInput {
  question: string;
  word_limit: number;
  answer_text: string;
  parent_id?: string | null;
  version_number?: number;
}

export interface EvaluationResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  overall_feedback: string;
  covered_dimensions: string[];
  missing_dimensions: string[];
  ideal_structure: string;
  word_economy: string;
}

export interface ComparisonResult {
  score_diff: number;
  newly_covered: string[];
  still_missing: string[];
  improved_areas: string[];
  remaining_weaknesses: string[];
}

export interface EssayEvaluation {
  id: string;
  created_at: string;
  topic: string;
  word_limit: number;
  essay_text: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  covered_dimensions: string[];
  missing_dimensions: string[];
  structure_feedback: string;
}

export interface EssayEvaluationInput {
  topic: string;
  word_limit: number;
  essay_text: string;
}

export interface EssayEvaluationResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  covered_dimensions: string[];
  missing_dimensions: string[];
  structure_feedback: string;
}

