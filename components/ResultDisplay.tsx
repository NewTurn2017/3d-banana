
import React from 'react';
import { WandSparklesIcon, RefreshCwIcon } from './icons';

interface ResultDisplayProps {
  isLoading: boolean;
  error: string | null;
  generatedImages: string[];
  onReset: () => void;
}

const LoadingIndicator: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <WandSparklesIcon className="w-12 h-12 text-cyan-400 animate-pulse" />
    <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">Generating Your Images...</h2>
    <p className="mt-2 text-lg text-gray-300">The AI is working its magic. This may take a moment.</p>
    <div className="mt-8 w-full max-w-md bg-gray-700 rounded-full h-2.5">
      <div className="bg-cyan-500 h-2.5 rounded-full animate-pulse" style={{ width: '75%' }}></div>
    </div>
  </div>
);

const ErrorDisplay: React.FC<{ message: string; onReset: () => void }> = ({ message, onReset }) => (
  <div className="text-center p-8 bg-gray-800 border-2 border-red-500/50 rounded-lg">
    <h2 className="text-2xl font-bold text-red-400">Generation Failed</h2>
    <p className="mt-2 text-gray-300">{message}</p>
    <button
      onClick={onReset}
      className="mt-6 inline-flex items-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
    >
      <RefreshCwIcon className="w-4 h-4 mr-2" />
      Start Over
    </button>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, error, generatedImages, onReset }) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay message={error} onReset={onReset} />;
  }

  return (
    <div className="w-full max-w-5xl text-center">
      <div className="mb-4 inline-flex items-center justify-center p-3 bg-gray-800 rounded-full">
        <WandSparklesIcon className="w-8 h-8 text-cyan-400" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Generation Complete!</h2>
      <p className="mt-4 text-lg text-gray-300">Here are your multi-angle character shots. Download your favorites or start over to create new ones.</p>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {generatedImages.map((imageBase64, index) => (
          <div key={index} className="group relative aspect-square rounded-lg overflow-hidden border-2 border-gray-700">
            <img 
              src={`data:image/png;base64,${imageBase64}`} 
              alt={`Generated result ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <a
                href={`data:image/png;base64,${imageBase64}`}
                download={`generated-image-${index + 1}.png`}
                className="inline-flex items-center rounded-md bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/30"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={onReset}
        className="mt-10 inline-flex items-center rounded-md bg-cyan-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      >
        <RefreshCwIcon className="w-5 h-5 mr-2" />
        Start a New Project
      </button>
    </div>
  );
};
