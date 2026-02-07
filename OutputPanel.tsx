
import React from 'react';
import type { AnalysisResult } from '../types';
import { AugmentationCard } from './AugmentationCard';
import { ComparisonTable } from './ComparisonTable';
import { Loader } from './Loader';
import { WarningIcon, InfoIcon, CpuChipIcon } from './Icons';

interface OutputPanelProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <WarningIcon className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              <strong>Error:</strong> {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg h-full flex items-center">
        <div className="flex">
          <div className="flex-shrink-0">
            <InfoIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Your augmented data and analysis will appear here. Fill out the form to get started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Original Sentence</h2>
        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg italic">"{result.originalSentence}"</p>
      </div>

      {result.qualityWarnings && result.qualityWarnings.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <WarningIcon className="h-5 w-5 text-yellow-500 mr-2" />
            Quality Warnings
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-2">
            {result.qualityWarnings.map((warning, index) => (
              <p key={index} className="text-sm text-yellow-800">- {warning}</p>
            ))}
          </div>
        </div>
      )}
      
      {result.modelComparison && (
        <div>
           <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CpuChipIcon className="h-6 w-6 text-gray-600 mr-2"/>
            Model Performance Comparison
          </h2>
          {result.performanceSummary && (
             <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 className="font-semibold text-indigo-800 mb-1">Performance Summary</h3>
                <p className="text-sm text-indigo-700">{result.performanceSummary}</p>
             </div>
          )}
          <ComparisonTable modelComparison={result.modelComparison} />
        </div>
      )}


      <div>
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">Augmented Versions</h2>
        <div className="space-y-4">
          {result.augmentedVersions.map((aug, index) => (
            <AugmentationCard key={index} augmentation={aug} />
          ))}
        </div>
      </div>
    </div>
  );
};
