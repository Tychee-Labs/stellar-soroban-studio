import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, RoundedBox, PresentationControls, MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

// Glowing mesh orb in the background to provide a subject for transmission material to refract over
const BackgroundOrb = () => {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[1.5, -2, -3]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#f2572b" />
      </mesh>
    </Float>
  );
};

const BackgroundOrb2 = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh position={[-2.5, 1.5, -4]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#4338ca" />
      </mesh>
    </Float>
  );
};

const StylizedLock = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.5} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
      <group ref={groupRef} position={[2.2, 1.2, 0.5]} scale={0.35}>
        {/* Lock Body */}
        <RoundedBox args={[1, 0.8, 0.4]} radius={0.1} position={[0, -0.4, 0]}>
          <meshStandardMaterial color="#f2572b" metalness={0.5} roughness={0.2} />
        </RoundedBox>
        {/* Lock Shackle */}
        <mesh position={[0, 0.2, 0]}>
          <torusGeometry args={[0.35, 0.1, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Keyhole */}
        <mesh position={[0, -0.3, 0.21]}>
          <circleGeometry args={[0.1, 32]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
        <mesh position={[0, -0.5, 0.21]}>
          <planeGeometry args={[0.1, 0.25]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
      </group>
    </Float>
  );
};

const GlassCard = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle constant auto-rotation over time
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15 - Math.PI / 10;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.25) * 0.1 + Math.PI / 16;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
        <PresentationControls
           global
           rotation={[0, 0, 0]}
           polar={[-0.2, 0.2]}
           azimuth={[-0.4, 0.4]}
           config={{ mass: 2, tension: 400 }}
           snap={{ mass: 4, tension: 400 }}
        >
          <RoundedBox args={[4.2, 2.6, 0.08]} radius={0.15} smoothness={32}>
            {/* Ultra-realistic glass material */}
            <MeshTransmissionMaterial 
              samples={4}
              resolution={1024}
              thickness={0.08}
              roughness={0.08}
              transmission={1}
              ior={1.25}
              chromaticAberration={0.03}
              anisotropy={0.1}
              color="#ffffff"
            />

            {/* Chip */}
            <RoundedBox args={[0.5, 0.35, 0.02]} radius={0.05} position={[-1.5, 0.6, 0.05]} castShadow>
              <meshStandardMaterial color="#facc15" metalness={1} roughness={0.2} />
            </RoundedBox>
            
            {/* Chip contact lines */}
            <group position={[-1.5, 0.6, 0.061]}>
               <mesh position={[-0.15, 0, 0]}>
                  <boxGeometry args={[0.02, 0.25, 0.001]} />
                  <meshBasicMaterial color="#b45309" />
               </mesh>
               <mesh position={[0.15, 0, 0]}>
                  <boxGeometry args={[0.02, 0.25, 0.001]} />
                  <meshBasicMaterial color="#b45309" />
               </mesh>
               <mesh position={[0, 0.08, 0]}>
                  <boxGeometry args={[0.25, 0.02, 0.001]} />
                  <meshBasicMaterial color="#b45309" />
               </mesh>
               <mesh position={[0, -0.08, 0]}>
                  <boxGeometry args={[0.25, 0.02, 0.001]} />
                  <meshBasicMaterial color="#b45309" />
               </mesh>
            </group>

            {/* Tychee Brand */}
            <Text position={[1.6, 0.8, 0.05]} fontSize={0.24} color="#ffffff" anchorX="right" anchorY="middle" font="https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5.0.19/files/space-grotesk-latin-700-normal.woff">
              TYCHEE
            </Text>

            {/* Holographic Element */}
            <mesh position={[-1.6, -0.8, 0.051]}>
              <circleGeometry args={[0.25, 32]} />
              <meshStandardMaterial color="#f2572b" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[-1.35, -0.8, 0.052]}>
              <circleGeometry args={[0.25, 32]} />
              <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.2} transparent opacity={0.5} depthWrite={false} />
            </mesh>

            {/* Card Info */}
            <Text position={[0, -0.15, 0.05]} fontSize={0.22} color="#ffffff" letterSpacing={0.15} font="https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5.0.19/files/space-grotesk-latin-700-normal.woff">
              4532  1245  ••••  ••••
            </Text>
            
            <group position={[-1.2, -0.4, 0.05]}>
              <Text position={[-0.2, 0, 0]} fontSize={0.1} color="#ffffff" anchorX="right" anchorY="middle" font="https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5.0.19/files/space-grotesk-latin-400-normal.woff">
                VALID THRU
              </Text>
              <Text position={[-0.1, 0, 0]} fontSize={0.16} color="#ffffff" anchorX="left" anchorY="middle" font="https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5.0.19/files/space-grotesk-latin-700-normal.woff">
                12/28
              </Text>
            </group>

            <Text position={[1.6, -0.8, 0.05]} fontSize={0.1} color="#e2e8f0" anchorX="right" anchorY="middle" font="https://cdn.jsdelivr.net/npm/@fontsource/space-grotesk@5.0.19/files/space-grotesk-latin-400-normal.woff">
              SECURED BY SELF-CUSTODY
            </Text>
          </RoundedBox>
        </PresentationControls>
      </Float>
    </group>
  );
};

export const HeroVisual = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* 
        Enable pointer events for the canvas so hover/interactions work on the 3D model. 
        But we apply it only to the Canvas wrapper so clicks behind it pass through if needed. 
      */}
      <div className="w-full h-full" style={{ pointerEvents: "auto" }}>
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <spotLight position={[-10, -10, -10]} intensity={0.5} color="#f2572b" />
          
          <Environment preset="city" />
          
          <BackgroundOrb />
          <BackgroundOrb2 />
          <StylizedLock />
          <GlassCard />
        </Canvas>
      </div>

      {/* Overlay glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />
    </div>
  );
};
