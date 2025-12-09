import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Sphere } from "@react-three/drei";
import * as THREE from "three";

function ChatBubbleModel() {
  const groupRef = useRef<THREE.Group>(null);
  const dot1Ref = useRef<THREE.Mesh>(null);
  const dot2Ref = useRef<THREE.Mesh>(null);
  const dot3Ref = useRef<THREE.Mesh>(null);

  // Create a custom shape for the speech bubble including the tail
  const bubbleGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 2.4;
    const height = 1.8;
    const radius = 0.8;
    const x = -width / 2;
    const y = -height / 2;

    // Rounded rectangle body
    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    // Tail start
    shape.lineTo(x + width / 2 + 0.4, y);
    // Tail tip
    shape.lineTo(x + width / 2 - 0.2, y - 0.6);
    // Tail end (back to body)
    shape.lineTo(x + width / 2 - 0.2, y);
    
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);

    const extrudeSettings = {
      steps: 2,
      depth: 0.6, // Thicker for "more 3D" look
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 5
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }

    // Animate the dots (typing effect loop)
    if (dot1Ref.current && dot2Ref.current && dot3Ref.current) {
      const t = state.clock.elapsedTime * 5; // Speed of the loop
      
      // Calculate sine waves with offsets for each dot
      const d1 = Math.sin(t) * 0.5 + 0.5; // 0 to 1
      const d2 = Math.sin(t - 1) * 0.5 + 0.5;
      const d3 = Math.sin(t - 2) * 0.5 + 0.5;

      // Apply scaling based on the sine wave (pop effect)
      // Base scale is 1, pop adds up to 0.4
      dot1Ref.current.scale.setScalar(1 + d1 * 0.3);
      dot2Ref.current.scale.setScalar(1 + d2 * 0.3);
      dot3Ref.current.scale.setScalar(1 + d3 * 0.3);

      // Adjust emission intensity for glowing pulse
      const mat1 = dot1Ref.current.material as THREE.MeshStandardMaterial;
      const mat2 = dot2Ref.current.material as THREE.MeshStandardMaterial;
      const mat3 = dot3Ref.current.material as THREE.MeshStandardMaterial;

      if (mat1) mat1.emissiveIntensity = 0.5 + d1 * 0.5;
      if (mat2) mat2.emissiveIntensity = 0.5 + d2 * 0.5;
      if (mat3) mat3.emissiveIntensity = 0.5 + d3 * 0.5;
    }
  });

  return (
    <Float
      speed={2.5} 
      rotationIntensity={0.2} 
      floatIntensity={0.8} 
      floatingRange={[-0.15, 0.15]}
    >
      <group ref={groupRef}>
        {/* Main Bubble Body with Tail */}
        <mesh geometry={bubbleGeometry} position={[0, 0.2, -0.3]}>
           {/* Center the geometry visually */}
          <meshPhysicalMaterial
            color="#6366f1" // Indigo-500
            emissive="#4f46e5"
            emissiveIntensity={0.2}
            roughness={0.15} // Glossy
            metalness={0.1}  // Plastic-like
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* The 3 Dots "..." - Make them pop out slightly */}
        <group position={[0, 0.2, 0.35]}> 
          <Sphere ref={dot1Ref} args={[0.22, 32, 32]} position={[-0.7, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} roughness={0.2} />
          </Sphere>
          <Sphere ref={dot2Ref} args={[0.22, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} roughness={0.2} />
          </Sphere>
          <Sphere ref={dot3Ref} args={[0.22, 32, 32]} position={[0.7, 0, 0]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} roughness={0.2} />
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
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a5b4fc" />
        <pointLight position={[-10, -5, -10]} intensity={0.5} color="#818cf8" />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} />
        <ChatBubbleModel />
      </Canvas>
      
      {/* Stronger Glow Effect Layer */}
      <div className="absolute inset-0 pointer-events-none bg-primary/30 blur-[60px] rounded-full transform scale-75" />
    </div>
  );
}
