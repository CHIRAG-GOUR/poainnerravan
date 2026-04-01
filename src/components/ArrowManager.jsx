import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const arrowTypes = ['fire', 'beam', 'glow'];

function Arrow({ start, target, type, isDeflected, onHit, id }) {
  const meshRef = useRef();
  const progress = useRef(0);
  const speed = 0.5 + Math.random() * 0.3; // Randomize speed slightly

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    progress.current += delta * speed;
    
    if (progress.current >= 1) {
      // Hit target
      onHit(id, isDeflected, target);
      return;
    }

    // Interpolate position
    meshRef.current.position.lerpVectors(
      new THREE.Vector3(...start),
      new THREE.Vector3(...target),
      progress.current
    );
    
    // Look at target
    meshRef.current.lookAt(new THREE.Vector3(...target));
  });

  // Different materials based on type
  const material = 
    type === 'fire' ? <meshBasicMaterial color="#ff4500" /> :
    type === 'beam' ? <meshBasicMaterial color="#00ffff" /> :
    <meshBasicMaterial color="#ff00ff" />;

  return (
    <mesh ref={meshRef} position={start}>
      <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
      {material}
      <pointLight color={type === 'fire' ? '#ff4500' : (type === 'beam' ? '#00ffff' : '#ff00ff')} intensity={0.5} distance={3} />
    </mesh>
  );
}

export default function ArrowManager({ ramPos, ravanaPos, onImpact }) {
  const [arrows, setArrows] = useState([]);
  let arrowIdCounter = useRef(0);

  useEffect(() => {
    // Fire arrows every 3-5 seconds
    let timeout;
    const fireInterval = () => {
      const delay = 3000 + Math.random() * 2000;
      timeout = setTimeout(() => {
        const type = arrowTypes[Math.floor(Math.random() * arrowTypes.length)];
        const isDeflected = Math.random() > 0.4; // 60% chance to be deflected
        
        const newArrow = {
          id: arrowIdCounter.current++,
          start: ramPos,
          // Target slightly randomized around Ravana's center
          target: [
            ravanaPos[0] + (Math.random() - 0.5) * 2,
            ravanaPos[1] + (Math.random() - 0.5) * 3,
            ravanaPos[2] + (Math.random() - 0.5) * 2
          ],
          type,
          isDeflected
        };
        
        setArrows(prev => [...prev, newArrow]);
        fireInterval();
      }, delay);
    };
    
    fireInterval();
    return () => clearTimeout(timeout);
  }, [ramPos, ravanaPos]);

  const handleHit = (id, isDeflected, hitPos) => {
    setArrows(prev => prev.filter(a => a.id !== id));
    if (onImpact) onImpact(isDeflected, hitPos);
  };

  return (
    <group>
      {arrows.map(arrow => (
        <Arrow 
          key={arrow.id} 
          {...arrow} 
          onHit={handleHit} 
        />
      ))}
    </group>
  );
}
