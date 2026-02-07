
export interface Augmentation {
  version: string;
  sentence: string;
  notes: string;
}

export interface Scores {
  bleu: number;
  rouge: number;
  meteor: number;
  chrf: number;
}

export interface ModelPerformance {
  trainedOnOriginal: Scores;
  trainedOnAugmented: Scores;
  fineTunedOnAugmented: Scores;
}

export interface ModelComparison {
  nllb: ModelPerformance;
  mbart: ModelPerformance;
  mt5: ModelPerformance;
}

export interface AnalysisResult {
  originalSentence: string;
  augmentedVersions: Augmentation[];
  qualityWarnings: string[] | null;
  modelComparison: ModelComparison | null;
  performanceSummary: string | null;
}

export interface AugmentationOptions {
  lexical: boolean;
  syntactic: boolean;
  reformulation: boolean;
  backTranslation: boolean;
}
