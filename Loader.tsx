
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md border border-gray-200 min-h-[300px]">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
      <p className="mt-4 text-gray-600 font-medium">Augmenting & Analyzing...</p>
      <p className="mt-1 text-sm text-gray-500">This may take a moment.</p>
    </div>
  );
};
