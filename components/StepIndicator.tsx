
import React from 'react';
import { AppStep } from '../types';
import { CameraIcon, ShapesIcon, UploadIcon, WandSparklesIcon } from './icons';

interface StepIndicatorProps {
  currentStep: AppStep;
}

const steps = [
  { id: AppStep.SELECT_ASPECT_RATIO, name: 'Ratio', icon: <CameraIcon className="w-5 h-5"/> },
  { id: AppStep.CREATE_COMPOSITION, name: 'Compose', icon: <ShapesIcon className="w-5 h-5"/> },
  { id: AppStep.UPLOAD_IMAGE, name: 'Upload', icon: <UploadIcon className="w-5 h-5"/> },
  { id: AppStep.GENERATE_IMAGES, name: 'Generate', icon: <WandSparklesIcon className="w-5 h-5"/> },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const effectiveStep = currentStep === AppStep.SHOW_RESULTS ? AppStep.GENERATE_IMAGES : currentStep;
  
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
        {steps.map((step, index) => {
          const isCompleted = effectiveStep > step.id;
          const isCurrent = effectiveStep === step.id;

          return (
            <li key={step.name} className="flex items-center">
              <div
                className={`flex items-center text-sm font-medium ${
                  isCompleted ? 'text-cyan-400' : isCurrent ? 'text-cyan-300' : 'text-gray-400'
                }`}
              >
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                    isCompleted
                      ? 'bg-cyan-600'
                      : isCurrent
                      ? 'border-2 border-cyan-500 bg-gray-800'
                      : 'border-2 border-gray-600 bg-gray-800'
                  }`}
                >
                  {isCompleted ? <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" /></svg> : step.icon}
                </span>
                <span className="ml-2 hidden sm:inline">{step.name}</span>
              </div>
              {index !== steps.length - 1 && (
                <div className="h-0.5 w-4 sm:w-8 bg-gray-600 ml-2 sm:ml-4" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
