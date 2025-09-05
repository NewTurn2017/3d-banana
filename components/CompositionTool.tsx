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

// LEGO-style human figure with face features for orientation
const HumanFigure: React.FC = () => {
    return (
        <group position={[0, 0, 0]}>
            {/* Head - Cylindrical LEGO style */}
            <mesh position={[0, 1.6, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.4, 8]} />
                <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Head top stud (LEGO connection point) */}
            <mesh position={[0, 1.85, 0]}>
                <cylinderGeometry args={[0.12, 0.12, 0.1, 8]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Eyes (front indicators) */}
            <mesh position={[-0.1, 1.65, 0.28]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#1f2937" />
            </mesh>
            <mesh position={[0.1, 1.65, 0.28]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#1f2937" />
            </mesh>
            
            {/* Nose (front indicator) */}
            <mesh position={[0, 1.55, 0.32]}>
                <boxGeometry args={[0.08, 0.08, 0.05]} />
                <meshStandardMaterial color="#dc2626" />
            </mesh>
            
            {/* Mouth (front indicator) */}
            <mesh position={[0, 1.45, 0.29]}>
                <boxGeometry args={[0.15, 0.03, 0.02]} />
                <meshStandardMaterial color="#dc2626" />
            </mesh>
            
            {/* Body/Torso - LEGO brick style */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[0.8, 1.2, 0.5]} />
                <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Body studs (4 LEGO connection points on top) */}
            <mesh position={[-0.2, 1.15, -0.1]}>
                <cylinderGeometry args={[0.08, 0.08, 0.08, 8]} />
                <meshStandardMaterial color="#2563eb" />
            </mesh>
            <mesh position={[0.2, 1.15, -0.1]}>
                <cylinderGeometry args={[0.08, 0.08, 0.08, 8]} />
                <meshStandardMaterial color="#2563eb" />
            </mesh>
            <mesh position={[-0.2, 1.15, 0.1]}>
                <cylinderGeometry args={[0.08, 0.08, 0.08, 8]} />
                <meshStandardMaterial color="#2563eb" />
            </mesh>
            <mesh position={[0.2, 1.15, 0.1]}>
                <cylinderGeometry args={[0.08, 0.08, 0.08, 8]} />
                <meshStandardMaterial color="#2563eb" />
            </mesh>
            
            {/* Left Arm - Cylindrical LEGO style */}
            <mesh position={[-0.55, 0.6, 0]}>
                <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
                <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Left Hand */}
            <mesh position={[-0.55, 0.1, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.15, 8]} />
                <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Right Arm - Cylindrical LEGO style */}
            <mesh position={[0.55, 0.6, 0]}>
                <cylinderGeometry args={[0.12, 0.12, 0.8, 8]} />
                <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Right Hand */}
            <mesh position={[0.55, 0.1, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.15, 8]} />
                <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Hip joint */}
            <mesh position={[0, -0.2, 0]}>
                <boxGeometry args={[0.6, 0.2, 0.4]} />
                <meshStandardMaterial color="#1e40af" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Left Leg - LEGO brick style */}
            <mesh position={[-0.2, -0.7, 0]}>
                <boxGeometry args={[0.25, 0.8, 0.3]} />
                <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Left Foot */}
            <mesh position={[-0.2, -1.2, 0.05]}>
                <boxGeometry args={[0.25, 0.15, 0.4]} />
                <meshStandardMaterial color="#1f2937" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Right Leg - LEGO brick style */}
            <mesh position={[0.2, -0.7, 0]}>
                <boxGeometry args={[0.25, 0.8, 0.3]} />
                <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.1} />
            </mesh>
            
            {/* Right Foot */}
            <mesh position={[0.2, -1.2, 0.05]}>
                <boxGeometry args={[0.25, 0.15, 0.4]} />
                <meshStandardMaterial color="#1f2937" roughness={0.2} metalness={0.1} />
            </mesh>
        </group>
    );
};

const Scene: React.FC = () => {
    return (
        <>
            <color attach="background" args={['#f3f4f6']} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} />
            <HumanFigure />
            <gridHelper args={[10, 10, '#9ca3af', '#e5e7eb']} position={[0, -1.3, 0]} />
            <OrbitControls enablePan={false} minDistance={3} maxDistance={15} />
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
                        gl={{ 
                            preserveDrawingBuffer: true,
                            antialias: true,
                            alpha: true
                        }}
                        dpr={[1, 2]}
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