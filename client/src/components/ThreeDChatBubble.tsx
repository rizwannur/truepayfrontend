import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, MeshDistortMaterial, RoundedBox, Cone } from "@react-three/drei";
import * as THREE from "three";

function ChatBubbleModel() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={0.5} 
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={meshRef}>
        {/* Main Bubble Body */}
        <RoundedBox args={[2.5, 1.8, 0.5]} radius={0.5} smoothness={4}>
          <MeshDistortMaterial
            color="#6366f1" // Indigo-500
            emissive="#4f46e5" // Indigo-600
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            distort={0.2}
            speed={2}
          />
        </RoundedBox>
        
        {/* Bubble Tail */}
        <mesh position={[-0.8, -1.2, 0]} rotation={[0, 0, Math.PI / 6]}>
           <coneGeometry args={[0.4, 0.8, 32]} />
           <MeshDistortMaterial
            color="#6366f1"
            emissive="#4f46e5"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            distort={0.2}
            speed={2}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function ThreeDChatBubble() {
  return (
    <div className="w-full h-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a5b4fc" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#818cf8" />
        <ChatBubbleModel />
      </Canvas>
      
      {/* Glow Effect Layer */}
      <div className="absolute inset-0 pointer-events-none bg-primary/20 blur-[60px] rounded-full transform scale-50" />
    </div>
  );
}
