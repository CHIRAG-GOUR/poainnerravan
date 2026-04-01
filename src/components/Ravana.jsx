import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/*
 * Cinematic Ravana – 10-headed massive silhouette with red rim-lighting & glowing eyes
 */

const SILHOUETTE = '#050308';
const RIM_RED = '#ff2200';
const EYE_GLOW = '#ff0000';
const ARMOR_HIGHLIGHT = '#d4a017';

function CinematicRavanaHead({ position, scale = 1, rotation = [0, 0, 0] }) {
  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* Head Block */}
      <mesh>
        <sphereGeometry args={[0.3, 20, 20]} />
        <meshStandardMaterial color={SILHOUETTE} metalness={0.1} roughness={0.9} />
      </mesh>
      {/* Crown Piece - Catching light */}
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.2, 0.4, 8]} />
        <meshStandardMaterial color={SILHOUETTE} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Glowing red eyes */}
      {[-0.08, 0.08].map((x, i) => (
        <group key={i} position={[x, 0.05, 0.25]}>
          <mesh>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color={EYE_GLOW} />
          </mesh>
          <pointLight color={EYE_GLOW} intensity={0.5} distance={0.5} />
        </group>
      ))}
    </group>
  );
}

export default function Ravana({ hitFlash, mouse }) {
  const group = useRef();
  const auraRef = useRef();

  useFrame(({ clock }) => {
    if (group.current) {
      // Intimidating cinematic hover
      group.current.position.y = 0 + Math.sin(clock.elapsedTime * 1.2) * 0.1;
      // Subtle turn towards mouse
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (mouse?.x || 0) * -0.12 - 0.4, 0.05);
      // Flinch from hitFlash
      if (hitFlash) {
         group.current.position.x += (Math.random() - 0.5) * 0.1;
      }
    }
    if (auraRef.current) {
      auraRef.current.intensity = 2 + Math.sin(clock.elapsedTime * 3) * 0.5;
    }
  });

  return (
    <group ref={group} position={[6, 0, -2]} rotation={[0, -0.4, 0]} scale={[1.4, 1.4, 1.4]}>
      <Float speed={1.2} rotationIntensity={0.03} floatIntensity={0.15}>

        {/* === TORSO SILHOUETTE === */}
        {/* Massive chest/shoulders */}
        <mesh position={[0, 1.2, 0]}>
          <capsuleGeometry args={[0.8, 1.5, 12, 16]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>
        
        {/* Golden armor highlight - small plates catching light */}
        <mesh position={[0, 1.6, 0.7]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.05]} />
          <meshStandardMaterial color={ARMOR_HIGHLIGHT} metalness={0.9} roughness={0.1} emissive="#331100" />
        </mesh>

        {/* Arms holding weapon/blocking */}
        <mesh position={[-0.9, 1.5, 0.5]} rotation={[0.4, 0, 0.6]}>
          <capsuleGeometry args={[0.18, 1.2, 8, 12]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>
        <mesh position={[0.9, 1.3, 0.8]} rotation={[-0.3, 0, -0.8]}>
          <capsuleGeometry args={[0.18, 1.2, 8, 12]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>

        {/* === 10 HEADS RING === */}
        {/* Central main head */}
        <CinematicRavanaHead position={[0, 2.8, 0]} scale={1.2} />
        
        {/* Flanking heads */}
        <CinematicRavanaHead position={[-0.5, 2.7, -0.1]} scale={1.0} rotation={[0, 0.2, 0]} />
        <CinematicRavanaHead position={[0.5, 2.7, -0.1]} scale={1.0} rotation={[0, -0.2, 0]} />
        
        <CinematicRavanaHead position={[-0.9, 2.5, -0.3]} scale={0.9} rotation={[0, 0.4, 0]} />
        <CinematicRavanaHead position={[0.9, 2.5, -0.3]} scale={0.9} rotation={[0, -0.4, 0]} />
        
        <CinematicRavanaHead position={[-1.2, 2.3, -0.5]} scale={0.8} rotation={[0, 0.6, 0]} />
        <CinematicRavanaHead position={[1.2, 2.3, -0.5]} scale={0.8} rotation={[0, -0.6, 0]} />
        
        <CinematicRavanaHead position={[-0.3, 3.2, -0.2]} scale={0.85} rotation={[-0.1, 0.1, 0]} />
        <CinematicRavanaHead position={[0.3, 3.2, -0.2]} scale={0.85} rotation={[-0.1, -0.1, 0]} />
        <CinematicRavanaHead position={[0, 3.5, -0.4]} scale={0.7} />

        {/* === LOWER BODY === */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.7, 0.9, 2.0, 16]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>
        
        {/* Wide stance legs */}
        <mesh position={[-0.5, -1.8, 0.2]} rotation={[0, 0, 0.35]}>
          <capsuleGeometry args={[0.22, 2, 8, 12]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>
        <mesh position={[0.5, -1.8, -0.2]} rotation={[0, 0, -0.35]}>
          <capsuleGeometry args={[0.22, 2, 8, 12]} />
          <meshStandardMaterial color={SILHOUETTE} />
        </mesh>

        {/* === RIM LIGHTING (Red Aura) === */}
        <mesh position={[0, 1, -0.5]} scale={[1.2, 1.2, 1.2]}>
          <capsuleGeometry args={[1.0, 6, 12, 16]} />
          <meshBasicMaterial color={RIM_RED} transparent opacity={0.12} />
        </mesh>
        
        {/* Internal red glow for hit flashing */}
        <pointLight ref={auraRef} position={[0, 2.5, 1.5]} intensity={2.5} distance={12} color={EYE_GLOW} />
        
        {/* Fire sparks specific to Ravana aura */}
        <Sparkles count={40} scale={5} size={6} speed={0.5} opacity={1} color={EYE_GLOW} />

      </Float>
    </group>
  );
}
