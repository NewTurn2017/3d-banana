
import React from 'react';
import type { AspectRatio } from '../types';
import { CameraIcon } from './icons';

interface AspectRatioSelectorProps {
  onSelect: (ratio: AspectRatio) => void;
}

const options: { ratio: AspectRatio; label: string; dimensions: string }[] = [
  { ratio: '1:1', label: 'Square', dimensions: 'Best for profiles' },
  { ratio: '16:9', label: 'Landscape', dimensions: 'Best for wide shots' },
  { ratio: '9:16', label: 'Portrait', dimensions: 'Best for stories' },
];

export const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-2xl text-center">
      <div className="mb-4 inline-flex items-center justify-center p-3 bg-gray-800 rounded-full">
        <CameraIcon className="w-8 h-8 text-cyan-400" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Choose an Aspect Ratio</h2>
      <p className="mt-4 text-lg text-gray-300">Select the canvas shape for your compositions. This will determine the final output format of your images.</p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {options.map((option) => (
          <button
            key={option.ratio}
            onClick={() => onSelect(option.ratio)}
            className="group relative flex flex-col items-center justify-center rounded-lg border-2 border-gray-700 bg-gray-800 p-6 text-center transition-all hover:border-cyan-500 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <div className={`border-2 border-dashed border-gray-500 group-hover:border-cyan-400 mb-4 transition-colors ${
              option.ratio === '1:1' ? 'w-16 h-16' : option.ratio === '16:9' ? 'w-24 h-[54px]' : 'w-[54px] h-24'
            }`}></div>
            <p className="font-semibold text-white text-lg">{option.label}</p>
            <p className="text-sm text-gray-400">{option.dimensions}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
