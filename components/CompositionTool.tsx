import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import type { AspectRatio } from '../types';
import { ShapesIcon, CheckIcon } from './icons';

interface CompositionToolProps {
  aspectRatio: AspectRatio;
  onComplete: (images: string[]) => void;
}

// Human figure component using simple 3D shapes
const HumanFigure: React.FC = () => {
    return (
        <group position={[0, 0, 0]}>
            {/* Head */}
            <mesh position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.2} />
            </mesh>
            
            {/* Body/Torso */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[0.8, 1.2, 0.4]} />
                <meshStandardMaterial color="#0891b2" roughness={0.3} metalness={0.2} />
            </mesh>
            
            {/* Left Arm */}
            <mesh position={[-0.6, 0.6, 0]} rotation={[0, 0, Math.PI / 8]}>
                <boxGeometry args={[0.2, 0.8, 0.2]} />
                <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.2} />
            </mesh>
            
            {/* Right Arm */}
            <mesh position={[0.6, 0.6, 0]} rotation={[0, 0, -Math.PI / 8]}>
                <boxGeometry args={[0.2, 0.8, 0.2]} />
                <meshStandardMaterial color="#06b6d4" roughness={0.3} metalness={0.2} />
            </mesh>
            
            {/* Left Leg */}
            <mesh position={[-0.25, -0.6, 0]}>
                <boxGeometry args={[0.25, 1, 0.25]} />
                <meshStandardMaterial color="#0891b2" roughness={0.3} metalness={0.2} />
            </mesh>
            
            {/* Right Leg */}
            <mesh position={[0.25, -0.6, 0]}>
                <boxGeometry args={[0.25, 1, 0.25]} />
                <meshStandardMaterial color="#0891b2" roughness={0.3} metalness={0.2} />
            </mesh>
        </group>
    );
};

const Scene: React.FC = () => {
    return (
        <>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
            <HumanFigure />
            <OrbitControls enablePan={false} minDistance={3} maxDistance={15} />
            <Environment preset="city" />
        </>
    );
};

export const CompositionTool: React.FC<CompositionToolProps> = ({ aspectRatio, onComplete }) => {
    const [compositions, setCompositions] = useState<string[]>([]);
    // Fix: Initialize useRef with null. The error "Expected 1 arguments, but got 0" likely refers to this call.
    const glRef = useRef<any>(null);
    
    const aspectRatioClasses: Record<AspectRatio, string> = {
        '1:1': 'aspect-square',
        '16:9': 'aspect-video',
        '9:16': 'aspect-[9/16]',
    };

    const handleCapture = () => {
        if (glRef.current && compositions.length < 3) {
            const dataURL = glRef.current.domElement.toDataURL('image/png');
            setCompositions(prev => [...prev, dataURL]);
        }
    };
    
    return (
        <div className="w-full max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center justify-center p-3 bg-gray-800 rounded-full">
              <ShapesIcon className="w-8 h-8 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Create Your Compositions</h2>
            <p className="mt-4 text-lg text-gray-300">Rotate (left-click) and zoom (scroll) the human figure to set your desired camera angles. Capture up to 3 shots.</p>
            
            <div className="mt-8 flex flex-col lg:flex-row gap-6 items-start">
                <div className={`w-full lg:w-2/3 mx-auto rounded-lg overflow-hidden bg-gray-800 border-2 border-gray-700 ${aspectRatioClasses[aspectRatio]}`}>
                    <Canvas 
                        gl={{ preserveDrawingBuffer: true }}
                        camera={{ position: [5, 5, 5], fov: 50 }}
                        onCreated={({ gl }) => { glRef.current = gl; }}
                        shadows
                    >
                        <Suspense fallback={null}>
                            <Scene />
                        </Suspense>
                    </Canvas>
                </div>
                
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                    <button
                        onClick={handleCapture}
                        disabled={compositions.length >= 3}
                        className="w-full inline-flex items-center justify-center rounded-md bg-cyan-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Capture Composition ({compositions.length}/3)
                    </button>
                    
                    <div className="grid grid-cols-3 gap-2">
                        {compositions.map((src, index) => (
                            <div key={index} className="aspect-square bg-gray-700 rounded-md overflow-hidden border-2 border-cyan-500">
                                <img src={src} alt={`Composition ${index + 1}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                         {Array.from({ length: 3 - compositions.length }).map((_, index) => (
                            <div key={index} className="aspect-square bg-gray-800 border-2 border-dashed border-gray-600 rounded-md"></div>
                        ))}
                    </div>

                    <button
                        onClick={() => onComplete(compositions)}
                        disabled={compositions.length === 0}
                        className="w-full mt-2 inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                       <CheckIcon className="w-5 h-5 mr-2" />
                       Confirm Compositions
                    </button>
                </div>
            </div>
        </div>
    );
};