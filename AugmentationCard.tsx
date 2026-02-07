
import React from 'react';
import type { Augmentation } from '../types';

interface AugmentationCardProps {
  augmentation: Augmentation;
}

export const AugmentationCard: React.FC<AugmentationCardProps> = ({ augmentation }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-indigo-700">{augmentation.version}</h3>
      </div>
      <p className="text-gray-800 mb-3">"{augmentation.sentence}"</p>
      <div className="bg-gray-100 rounded-md p-2">
        <p className="text-xs text-gray-600"><span className="font-medium">Notes:</span> {augmentation.notes}</p>
      </div>
    </div>
  );
};
