import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, RoundedBox, Sphere } from "@react-three/drei";
import * as THREE from "three";

function ChatBubbleModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={0.2} 
      floatIntensity={0.5} 
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={groupRef}>
        {/* Main Bubble Body */}
        <RoundedBox args={[2.2, 1.6, 0.4]} radius={0.3} smoothness={4}>
          <meshStandardMaterial
            color="#6366f1" // Indigo-500
            emissive="#4f46e5"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.7}
          />
        </RoundedBox>
        
        {/* Bubble Tail - Triangle Shape */}
        <mesh position={[-0.6, -0.9, 0]} rotation={[0, 0, Math.PI / 4]}>
           <coneGeometry args={[0.3, 0.6, 4]} /> {/* 4 segments for pyramid/triangle look */}
           <meshStandardMaterial
            color="#6366f1"
            emissive="#4f46e5"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* The 3 Dots "..." */}
        <group position={[0, 0, 0.21]}> {/* Slightly pushed out */}
          <Sphere args={[0.18, 32, 32]} position={[-0.6, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
          </Sphere>
          <Sphere args={[0.18, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
          </Sphere>
          <Sphere args={[0.18, 32, 32]} position={[0.6, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
          </Sphere>
        </group>
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
      <div className="absolute inset-0 pointer-events-none bg-primary/20 blur-[50px] rounded-full transform scale-75" />
    </div>
  );
}
