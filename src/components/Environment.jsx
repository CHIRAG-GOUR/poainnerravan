import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/*
 * Environment – Mountains, Moon, Ground/Terrain, Atmospheric fog
 */

/* Procedural mountain range using custom geometry */
function MountainRange({ position = [0, 0, 0], color = '#1a2040', scale = 1 }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Create a jagged mountain silhouette
    shape.moveTo(-15, 0);
    shape.lineTo(-13, 0);
    shape.lineTo(-11, 2.5);
    shape.lineTo(-9.5, 1.2);
    shape.lineTo(-8, 3.8);
    shape.lineTo(-6.5, 2.0);
    shape.lineTo(-5, 4.5);
    shape.lineTo(-3.5, 2.8);
    shape.lineTo(-2, 5.2);
    shape.lineTo(-0.5, 3.0);
    shape.lineTo(0.5, 6.0);
    shape.lineTo(1.5, 3.5);
    shape.lineTo(3, 4.8);
    shape.lineTo(4.5, 2.5);
    shape.lineTo(6, 5.5);
    shape.lineTo(7.5, 3.0);
    shape.lineTo(9, 4.2);
    shape.lineTo(10.5, 1.8);
    shape.lineTo(12, 3.5);
    shape.lineTo(13.5, 1.0);
    shape.lineTo(15, 0);
    shape.lineTo(-15, 0);

    const extrudeSettings = { depth: 2, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <mesh geometry={geometry} position={position} scale={[scale, scale, scale]}>
      <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

/* A second mountain layer (further back, lighter) */
function MountainRangeBack({ position = [0, 0, 0] }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-18, 0);
    shape.lineTo(-15, 1.5);
    shape.lineTo(-12, 3.0);
    shape.lineTo(-10, 2.0);
    shape.lineTo(-7, 4.5);
    shape.lineTo(-4, 2.5);
    shape.lineTo(-1, 5.8);
    shape.lineTo(2, 3.5);
    shape.lineTo(5, 7.0);
    shape.lineTo(8, 4.0);
    shape.lineTo(10, 5.5);
    shape.lineTo(13, 2.5);
    shape.lineTo(15, 4.0);
    shape.lineTo(18, 1.5);
    shape.lineTo(18, 0);
    shape.lineTo(-18, 0);

    const extrudeSettings = { depth: 1, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <mesh geometry={geometry} position={position}>
      <meshStandardMaterial color="#0e1628" roughness={0.95} metalness={0.05} />
    </mesh>
  );
}

/* Full Moon */
function Moon() {
  const moonRef = useRef();

  useFrame(({ clock }) => {
    if (moonRef.current) {
      moonRef.current.position.y = 7 + Math.sin(clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={moonRef} position={[-6, 7, -15]}>
      {/* Moon sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#f0e6d2"
          emissive="#f5deb3"
          emissiveIntensity={0.6}
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>
      {/* Crater detail - darker patches */}
      <mesh position={[-0.3, 0.4, 1.6]} rotation={[0, 0.2, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#c8b896" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, -0.2, 1.5]} rotation={[0, -0.3, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#bfad8a" roughness={0.9} />
      </mesh>
      <mesh position={[-0.5, -0.5, 1.4]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#c4b28e" roughness={0.9} />
      </mesh>
      {/* Moon glow */}
      <pointLight color="#ffeedd" intensity={3} distance={25} />
      {/* Halo ring */}
      <mesh>
        <ringGeometry args={[2.0, 2.8, 64]} />
        <meshBasicMaterial color="#ffeedd" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[2.0, 3.5, 64]} />
        <meshBasicMaterial color="#ffeedd" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* Terrain / Ground */
function Ground() {
  return (
    <group>
      {/* Main ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, 0]}>
        <planeGeometry args={[50, 30]} />
        <meshStandardMaterial color="#1a0f0a" roughness={0.95} metalness={0.05} />
      </mesh>
      {/* Slight mound/hills in foreground */}
      <mesh position={[-8, -4.2, 3]} rotation={[-0.1, 0, 0]}>
        <sphereGeometry args={[3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 4]} />
        <meshStandardMaterial color="#1c1008" roughness={0.9} />
      </mesh>
      <mesh position={[8, -4.3, 2]} rotation={[-0.05, 0.2, 0]}>
        <sphereGeometry args={[4, 16, 16, 0, Math.PI * 2, 0, Math.PI / 4]} />
        <meshStandardMaterial color="#1a0e07" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* Full environment */
export default function Environment() {
  return (
    <group>
      {/* Sky gradient background */}
      <mesh position={[0, 5, -20]}>
        <planeGeometry args={[60, 35]} />
        <meshBasicMaterial color="#0a0e1f" />
      </mesh>

      {/* Moon */}
      <Moon />

      {/* Stars – multiple layers for depth */}
      <Sparkles count={500} scale={[40, 25, 10]} size={1.2} speed={0.04} opacity={0.5} color="#ffffff" position={[0, 6, -12]} />
      <Sparkles count={200} scale={[35, 20, 5]} size={2.5} speed={0.02} opacity={0.3} color="#aaccff" position={[0, 8, -15]} />

      {/* Mountain ranges – layered for parallax depth */}
      <MountainRangeBack position={[0, -4.5, -16]} />
      <MountainRange position={[0, -4.5, -12]} color="#111830" scale={0.8} />
      <MountainRange position={[3, -4.5, -9]} color="#151d38" scale={0.6} />

      {/* Terrain / Ground */}
      <Ground />

      {/* Atmospheric lighting */}
      <hemisphereLight skyColor="#1a2544" groundColor="#2a1500" intensity={0.5} />
      <directionalLight position={[-6, 8, -10]} intensity={0.4} color="#ffeedd" /> {/* Moonlight */}
      <fog attach="fog" args={['#0a0e1f', 15, 35]} />
    </group>
  );
}
