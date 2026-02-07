
import React, { useState } from 'react';
import type { AugmentationOptions } from '../types';

interface InputPanelProps {
  onAnalyze: (
    originalSentence: string,
    language: string,
    options: AugmentationOptions
  ) => void;
  isLoading: boolean;
}

export const InputPanel: React.FC<InputPanelProps> = ({ onAnalyze, isLoading }) => {
  const [originalSentence, setOriginalSentence] = useState('');
  const [language, setLanguage] = useState('');
  const [options, setOptions] = useState<AugmentationOptions>({
    lexical: true,
    syntactic: true,
    reformulation: true,
    backTranslation: false,
  });

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (originalSentence.trim() && language.trim()) {
      onAnalyze(originalSentence, language, options);
    }
  };

  const canSubmit = originalSentence.trim() && language.trim() && !isLoading;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Indic Language
          </label>
          <input
            type="text"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="e.g., Hindi, Bengali, Tamil"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition bg-gray-100 focus:bg-white"
            required
          />
        </div>

        <div>
          <label htmlFor="original-sentence" className="block text-sm font-medium text-gray-700 mb-1">
            Original Sentence
          </label>
          <textarea
            id="original-sentence"
            rows={4}
            value={originalSentence}
            onChange={(e) => setOriginalSentence(e.target.value)}
            placeholder="Enter the sentence to augment and analyze."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition bg-gray-100 focus:bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Augmentation Methods</label>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(options).map((key) => (
              <div key={key} className="flex items-center">
                <input
                  id={key}
                  name={key}
                  type="checkbox"
                  checked={options[key as keyof AugmentationOptions]}
                  onChange={handleOptionChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor={key} className="ml-2 block text-sm text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace('Translation', '-Translation')}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Augment & Analyze'}
        </button>
      </form>
    </div>
  );
};
