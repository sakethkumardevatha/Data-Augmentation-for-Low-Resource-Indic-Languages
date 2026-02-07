
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { OutputPanel } from './components/OutputPanel';
import { augmentAndAnalyzeText } from './services/geminiService';
import type { AnalysisResult, AugmentationOptions } from './types';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisRequest = useCallback(async (
    originalSentence: string,
    language: string,
    options: AugmentationOptions
  ) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await augmentAndAnalyzeText(originalSentence, language, options);
      setAnalysisResult(result);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          <div className="lg:pr-4">
            <InputPanel onAnalyze={handleAnalysisRequest} isLoading={isLoading} />
          </div>
          <div className="mt-8 lg:mt-0">
            <OutputPanel result={analysisResult} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
