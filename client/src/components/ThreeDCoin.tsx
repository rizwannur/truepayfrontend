import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import bitcoinTextureUrl from '@assets/generated_images/3d_golden_bitcoin_with_purple_glow.png';

function CoinModel() {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(TextureLoader, bitcoinTextureUrl);
    
    // Configure texture to center it
    texture.center.set(0.5, 0.5);
    
    useFrame((state, delta) => {
        if (meshRef.current) {
             // Continuous spin
             meshRef.current.rotation.x += delta * 0.5;
             // Gentle wobble
             meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            {/* Rotate 90deg on Z to make cylinder face 'forward' (it defaults to standing up on Y) */}
            <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]}> 
                {/* RadiusTop, RadiusBottom, Height, RadialSegments */}
                <cylinderGeometry args={[2.2, 2.2, 0.2, 64]} />
                
                {/* Material Index 0: Side (Rim) - Gold */}
                <meshStandardMaterial attach="material-0" color="#fbbf24" metalness={0.9} roughness={0.2} />
                
                {/* Material Index 1: Top Face - Texture */}
                <meshStandardMaterial attach="material-1" map={texture} color="white" metalness={0.4} roughness={0.3} />
                
                {/* Material Index 2: Bottom Face - Texture */}
                <meshStandardMaterial attach="material-2" map={texture} color="white" metalness={0.4} roughness={0.3} />
            </mesh>
        </Float>
    );
}

export default function ThreeDCoin() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#818cf8" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#c084fc" />
        <CoinModel />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}