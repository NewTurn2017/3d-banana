
import React, { useState, useCallback } from 'react';
import { AppStep, AspectRatio } from './types';
import { generateImagesFromCompositions } from './services/geminiService';

import { StepIndicator } from './components/StepIndicator';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { CompositionTool } from './components/CompositionTool';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { LogoIcon } from './components/icons';


const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.SELECT_ASPECT_RATIO);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [compositionImages, setCompositionImages] = useState<string[]>([]);
  const [characterImage, setCharacterImage] = useState<{ data: string; type: string } | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAspectRatioSelect = (ratio: AspectRatio) => {
    setAspectRatio(ratio);
    setStep(AppStep.CREATE_COMPOSITION);
  };

  const handleCompositionsSet = (images: string[]) => {
    setCompositionImages(images);
    setStep(AppStep.UPLOAD_IMAGE);
  };

  const handleImageUpload = (imageData: { data: string; type: string }) => {
    setCharacterImage(imageData);
    setStep(AppStep.GENERATE_IMAGES);
    handleGenerateImages(imageData.data, imageData.type, compositionImages);
  };
  
  const handleGenerateImages = useCallback(async (charImgData: string, charImgType: string, compImages: string[]) => {
      if (!charImgData || compImages.length === 0) {
          setError("Character image and at least one composition are required.");
          setStep(AppStep.UPLOAD_IMAGE);
          return;
      }
      setIsLoading(true);
      setError(null);
      setStep(AppStep.SHOW_RESULTS);

      try {
          const results = await generateImagesFromCompositions(charImgData, charImgType, compImages);
          setGeneratedImages(results);
      } catch (e) {
          console.error(e);
          setError(e instanceof Error ? e.message : "An unknown error occurred during image generation.");
      } finally {
          setIsLoading(false);
      }
  }, []);

  const handleReset = () => {
    setStep(AppStep.SELECT_ASPECT_RATIO);
    setAspectRatio('1:1');
    setCompositionImages([]);
    setCharacterImage(null);
    setGeneratedImages([]);
    setIsLoading(false);
    setError(null);
  };

  const renderStep = () => {
    switch (step) {
      case AppStep.SELECT_ASPECT_RATIO:
        return <AspectRatioSelector onSelect={handleAspectRatioSelect} />;
      case AppStep.CREATE_COMPOSITION:
        return <CompositionTool aspectRatio={aspectRatio} onComplete={handleCompositionsSet} />;
      case AppStep.UPLOAD_IMAGE:
        return <ImageUploader onUpload={handleImageUpload} />;
      case AppStep.SHOW_RESULTS:
      case AppStep.GENERATE_IMAGES:
         return (
            <ResultDisplay
                isLoading={isLoading}
                error={error}
                generatedImages={generatedImages}
                onReset={handleReset}
            />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
       <header className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <LogoIcon className="w-10 h-10 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">3D Character Multi-Shot</h1>
        </div>
        <StepIndicator currentStep={step} />
      </header>
      <main className="w-full max-w-5xl mx-auto flex-grow flex items-start justify-center">
        {renderStep()}
      </main>
    </div>
  );
};

export default App;
