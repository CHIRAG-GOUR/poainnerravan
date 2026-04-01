import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

/*
 * CinematicEnvironment – Massive Sun/Moon, Volcanic Rocks, Embers
 */

function VolcanicRocks({ position, scale = 1, rotation = [0, 0, 0], color = '#080810' }) {
  const geometry = useMemo(() => {
    // Jagged, sharp rock formation
    const shape = new THREE.Shape();
    shape.moveTo(-4, 0);
    shape.lineTo(-3, 0.5);
    shape.lineTo(-2, 3);
    shape.lineTo(-1, 1.5);
    shape.lineTo(0, 4.5);
    shape.lineTo(1, 2);
    shape.lineTo(2, 3.5);
    shape.lineTo(3, 0.5);
    shape.lineTo(4, 0);
    shape.lineTo(-4, 0);

    return new THREE.ExtrudeGeometry(shape, { depth: 4, bevelEnabled: true, bevelThickness: 0.2 });
  }, []);

  return (
    <mesh geometry={geometry} position={position} scale={scale} rotation={rotation}>
      <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

function CinematicSun() {
  const sunRef = useRef();
  
  useFrame(({ clock }) => {
    if (sunRef.current) {
      // Subtle pulse
      const s = 1 + Math.sin(clock.elapsedTime * 0.5) * 0.03;
      sunRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 4, -25]}>
      {/* Sun Core */}
      <mesh ref={sunRef}>
        <circleGeometry args={[12, 64]} />
        <meshBasicMaterial color="#ff2200" transparent opacity={0.9} />
      </mesh>
      
      {/* Sun Inner Glow */}
      <mesh scale={[1.1, 1.1, 1]}>
        <circleGeometry args={[12, 64]} />
        <meshBasicMaterial color="#ff4400" transparent opacity={0.4} />
      </mesh>

      {/* Sun Large Halo */}
      <mesh scale={[1.4, 1.4, 1]}>
        <circleGeometry args={[12, 64]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.15} />
      </mesh>

      {/* Sun Lighting Source */}
      <pointLight intensity={8} distance={60} color="#ff3300" />
    </group>
  );
}

export default function CinematicEnvironment() {
  return (
    <group>
      {/* Deep dark sky - REMOVED TO SHOW VIDEO BACKGROUND
      <mesh position={[0, 0, -50]}>
        <planeGeometry args={[200, 150]} />
        <meshBasicMaterial color="#050308" />
      </mesh>
      */}

      {/* The background sun/moon source */}
      <CinematicSun />

      {/* Volcanic ash / embers floating up */}
      <Sparkles 
        count={300} 
        scale={[40, 30, 20]} 
        size={2} 
        speed={0.4} 
        opacity={0.6} 
        color="#ff8800" 
        position={[0, 5, -5]} 
      />

      {/* Ground Terrain - Jagged and dark */}
      <group position={[0, -6, 0]}>
        {/* Main ground bed */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#0a0a0c" roughness={1} />
        </mesh>

        {/* Rock plateaus for parallax depth */}
        <VolcanicRocks position={[-15, 0, -10]} scale={[1.5, 1.8, 1]} rotation={[0, 0.4, 0]} />
        <VolcanicRocks position={[12, 0, -15]} scale={[1.2, 2.2, 1]} rotation={[0, -0.3, 0]} />
        <VolcanicRocks position={[-8, 0, -20]} scale={[2, 1.5, 1.5]} color="#050508" />
        <VolcanicRocks position={[18, 0, -5]} scale={[0.8, 1.2, 1]} color="#101015" />
      </group>

      {/* Atmospheric Fog */}
      <fog attach="fog" args={['#050308', 10, 50]} />

      {/* Global Cinematic Lighting */}
      <ambientLight intensity={0.05} />
      <hemisphereLight skyColor="#100515" groundColor="#200a00" intensity={0.2} />
    </group>
  );
}
