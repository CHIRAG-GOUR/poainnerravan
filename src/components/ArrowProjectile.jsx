import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/*
 * Cinematic Arrow – High-speed neon light streak with bloom
 * Flies in a fast Bezier arc from Ram to Ravana
 */

const STREAK_COLORS = {
  fire:  '#ff4400',
  beam:  '#00ccff',
  glow:  '#ffd700',
};

const START = new THREE.Vector3(-4.5, 0, 2);
const TARGET_CENTER = new THREE.Vector3(5.5, 1.0, 0);

export default function ArrowProjectile({ id, type, isDeflected, onComplete }) {
  const groupRef = useRef();
  const progress = useRef(0);
  const done = useRef(false);
  const color = STREAK_COLORS[type] || STREAK_COLORS.fire;

  const target = useMemo(() => new THREE.Vector3(
    TARGET_CENTER.x + (Math.random() - 0.5) * 2,
    TARGET_CENTER.y + (Math.random() - 0.5) * 3.5,
    TARGET_CENTER.z
  ), []);

  const control = useMemo(() => {
    const mid = START.clone().lerp(target, 0.5);
    mid.y += 3.5;
    return mid;
  }, [target]);

  useFrame((state, delta) => {
    if (done.current || !groupRef.current) return;

    // Fast cinematic flight
    progress.current += delta * 1.5; 
    if (progress.current >= 1) {
      done.current = true;
      onComplete(id, isDeflected);
      return;
    }

    const t = progress.current;
    const omt = 1 - t;

    // Quadratic Bezier Position
    const x = omt * omt * START.x + 2 * omt * t * control.x + t * t * target.x;
    const y = omt * omt * START.y + 2 * omt * t * control.y + t * t * target.y;
    const z = omt * omt * START.z + 2 * omt * t * control.z + t * t * target.z;
    groupRef.current.position.set(x, y, z);

    // Orientation along tangent
    const dx = 2 * omt * (control.x - START.x) + 2 * t * (target.x - control.x);
    const dy = 2 * omt * (control.y - START.y) + 2 * t * (target.y - control.y);
    groupRef.current.rotation.z = Math.atan2(dy, dx);
  });

  return (
    <group ref={groupRef} position={START.toArray()}>
      {/* The Head - Bright Core */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Light Streak - The Tail */}
      <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.01, 0.08, 1.2, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
      
      {/* Outer Glow Streak */}
      <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.001, 0.15, 1.8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>

      {/* Point Light for impact glow */}
      <pointLight intensity={2} distance={3} color={color} />
    </group>
  );
}
