
import React from 'react';
import type { ModelComparison, Scores } from '../types';
import { ArrowUpIcon } from './Icons';

interface ComparisonTableProps {
  modelComparison: ModelComparison;
}

const ModelRow: React.FC<{ modelName: string; performance: any }> = ({ modelName, performance }) => {
  const original = performance.trainedOnOriginal;
  const augmented = performance.trainedOnAugmented;
  const fineTuned = performance.fineTunedOnAugmented;

  const calculateImprovement = (originalScore: number, newScore: number) => {
    if (originalScore === 0) return newScore > 0 ? 100 : 0;
    if (newScore <= originalScore) return 0;
    const improvement = ((newScore - originalScore) / originalScore) * 100;
    return improvement;
  };

  const renderScoreCell = (score: number, improvement: number) => (
    <div className="flex flex-col items-end">
      <span className="font-semibold">{score.toFixed(3)}</span>
      {improvement > 0.1 && (
        <span className="text-xs text-green-600 flex items-center font-medium">
          <ArrowUpIcon className="w-3 h-3 mr-0.5" />
          {improvement.toFixed(1)}%
        </span>
      )}
    </div>
  );

  return (
    <>
      <tr className="bg-gray-50">
        <td rowSpan={3} className="py-3 px-4 border-b border-gray-200 align-middle font-semibold text-gray-700">{modelName}</td>
        <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-600">Original</td>
        <td className="py-2 px-4 border-b border-gray-200 text-right font-mono text-sm">{original.bleu.toFixed(3)}</td>
        <td className="py-2 px-4 border-b border-gray-200 text-right font-mono text-sm">{original.rouge.toFixed(3)}</td>
        <td className="py-2 px-4 border-b border-gray-200 text-right font-mono text-sm">{original.meteor.toFixed(3)}</td>
        <td className="py-2 px-4 border-b border-gray-200 text-right font-mono text-sm">{original.chrf.toFixed(3)}</td>
      </tr>
      <tr className="bg-green-50">
        <td className="py-2 px-4 border-b border-gray-200 text-sm font-semibold text-gray-800">Augmented</td>
        <td className="py-2 px-4 border-b border-gray-200 text-right font-mono text-sm">
            {renderScoreCell(augmented.bleu, calculateImprovement(original.bleu, augmented.bleu))}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 text-right font-mono text-sm">
            {renderScoreCell(augmented.rouge, calculateImprovement(original.rouge, augmented.rouge))}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 text-right font-mono text-sm">
            {renderScoreCell(augmented.meteor, calculateImprovement(original.meteor, augmented.meteor))}
        </td>
        <td className="py-2 px-4 border-b border-gray-200 text-right font-mono text-sm">
            {renderScoreCell(augmented.chrf, calculateImprovement(original.chrf, augmented.chrf))}
        </td>
      </tr>
      <tr className="bg-teal-50">
        <td className="py-2 px-4 border-b border-gray-300 text-sm font-semibold text-gray-800">Fine-Tuned + Aug</td>
        <td className="py-2 px-4 border-b border-gray-300 text-right font-mono text-sm">
            {renderScoreCell(fineTuned.bleu, calculateImprovement(original.bleu, fineTuned.bleu))}
        </td>
        <td className="py-2 px-4 border-b border-gray-300 text-right font-mono text-sm">
            {renderScoreCell(fineTuned.rouge, calculateImprovement(original.rouge, fineTuned.rouge))}
        </td>
        <td className="py-2 px-4 border-b border-gray-300 text-right font-mono text-sm">
            {renderScoreCell(fineTuned.meteor, calculateImprovement(original.meteor, fineTuned.meteor))}
        </td>
        <td className="py-2 px-4 border-b border-gray-300 text-right font-mono text-sm">
            {renderScoreCell(fineTuned.chrf, calculateImprovement(original.chrf, fineTuned.chrf))}
        </td>
      </tr>
    </>
  );
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ modelComparison }) => {
  const models = [
    { name: 'NLLB', data: modelComparison.nllb },
    { name: 'mBART', data: modelComparison.mbart },
    { name: 'mT5', data: modelComparison.mt5 },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
            <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Training Data</th>
            <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">BLEU</th>
            <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ROUGE</th>
            <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">METEOR</th>
            <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">CHRF++</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {models.map(model => (
            <ModelRow key={model.name} modelName={model.name} performance={model.data} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
