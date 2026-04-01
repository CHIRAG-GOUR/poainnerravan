import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/*
 * Cinematic Lord Ram – High-detail silhouette with blue rim-lighting
 */

const SILHOUETTE = '#050510';
const RIM_BLUE = '#0088ff';
const BOW_GLOW = '#ffd700';

export default function LordRam({ mouse }) {
  const group = useRef();
  const bowRef = useRef();

  useFrame(({ clock }) => {
    if (group.current) {
      // Subtle cinematic breathing
      group.current.position.y = -3.5 + Math.sin(clock.elapsedTime * 1.5) * 0.05;
      // Look slightly at mouse
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (mouse?.x || 0) * 0.15 + 0.5, 0.05);
    }
    if (bowRef.current) {
      // Bow glow pulse
      const pulse = 1 + Math.sin(clock.elapsedTime * 4) * 0.1;
      bowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={group} position={[-6, -3.5, 2]} rotation={[0, 0.5, 0]}>
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
        
        {/* === BODY SILHOUETTE === */}
        {/* Head + Topknot */}
        <group position={[0, 4.2, 0]}>
          <mesh>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color={SILHOUETTE} envMapIntensity={0.2} />
          </mesh>
          <mesh position={[0, 0.35, -0.1]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color={SILHOUETTE} />
          </mesh>
        </group>

        {/* Torso - Lean and muscular pose */}
        <mesh position={[0, 3.2, 0]} rotation={[0.1, 0, 0]}>
          <capsuleGeometry args={[0.35, 1.2, 12, 16]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>

        {/* Arm drawing bow */}
        <mesh position={[0.5, 3.5, 0.2]} rotation={[0.5, 0, -1.2]}>
          <capsuleGeometry args={[0.1, 0.8, 8, 12]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>
        
        {/* Arm holding bow */}
        <mesh position={[-0.6, 3.4, 0.5]} rotation={[0.6, 0.2, 1.1]}>
          <capsuleGeometry args={[0.1, 0.9, 8, 12]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>

        {/* Lower body / Dhoti silhouette */}
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.35, 0.6, 1.5, 16]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>

        {/* Legs - Wide archer stance */}
        <mesh position={[-0.4, 0.8, 0.2]} rotation={[0, 0, 0.4]}>
          <capsuleGeometry args={[0.15, 1.5, 8, 12]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>
        <mesh position={[0.6, 0.8, -0.2]} rotation={[0, 0, -0.6]}>
          <capsuleGeometry args={[0.15, 1.5, 8, 12]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>

        {/* === VIBRANT GLOWING BOW === */}
        <group position={[-1.6, 3.2, 1.2]} rotation={[0, -0.4, 0.15]}>
          {/* Main Bow Arc */}
          <mesh ref={bowRef}>
            <torusGeometry args={[1.8, 0.05, 12, 48, Math.PI * 0.9]} />
            <meshBasicMaterial color={BOW_GLOW} transparent opacity={1} />
          </mesh>
          {/* Outer Bow Glow */}
          <mesh scale={[1.1, 1.1, 1.1]}>
            <torusGeometry args={[1.8, 0.08, 12, 48, Math.PI * 0.9]} />
            <meshBasicMaterial color={BOW_GLOW} transparent opacity={0.3} />
          </mesh>
          {/* Bow string - faint light */}
          <mesh position={[1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 3.5, 4]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
          </mesh>
          {/* Center Light */}
          <pointLight position={[1.5, 0, 0]} intensity={3} distance={5} color={BOW_GLOW} />
        </group>

        {/* === RIM LIGHTING (Blue Aura) === */}
        {/* Back Rim Light */}
        <mesh position={[0, 2, -0.2]} scale={[1.1, 1.1, 1.1]}>
          <capsuleGeometry args={[0.45, 4, 12, 16]} />
          <meshBasicMaterial color={RIM_BLUE} shader={THREE.AdditiveBlending} transparent opacity={0.15} />
        </mesh>
        
        {/* Subtle glow light source for rim */}
        <pointLight position={[0.5, 3, -1]} intensity={5} distance={10} color={RIM_BLUE} />

      </Float>
    </group>
  );
}
