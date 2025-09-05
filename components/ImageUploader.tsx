
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onUpload: (imageData: { data: string; type: string }) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        setPreview(null);
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = () => {
    if (preview) {
        const file = (document.getElementById('file-upload') as HTMLInputElement).files?.[0];
        if (file) {
           onUpload({ data: preview, type: file.type });
        }
    }
  };

  return (
    <div className="w-full max-w-2xl text-center">
      <div className="mb-4 inline-flex items-center justify-center p-3 bg-gray-800 rounded-full">
        <UploadIcon className="w-8 h-8 text-cyan-400" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Upload Your Character</h2>
      <p className="mt-4 text-lg text-gray-300">Upload a photo of the character and background you want to use as the source. This will be re-rendered from the angles you composed.</p>
      
      <div className="mt-8">
        <div className="flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 bg-gray-800/50">
          <div className="text-center">
            {preview ? (
              <img src={preview} alt="Image preview" className="mx-auto h-48 w-auto rounded-md" />
            ) : (
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="mt-4 flex text-sm leading-6 text-gray-400">
              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-semibold text-cyan-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-cyan-300">
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!preview}
        className="mt-8 w-full inline-flex items-center justify-center rounded-md bg-cyan-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Generate Images
      </button>
    </div>
  );
};
