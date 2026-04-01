import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import LordRam from './LordRam';
import Ravana from './Ravana';
import CinematicEnvironment from './CinematicEnvironment';
import ArrowProjectile from './ArrowProjectile';

/* ── Cinematic Battle Scene ── */
export default function Scene({ onHit }) {
  const cameraGroup = useRef();
  const { mouse } = useThree();
  const [hitFlash, setHitFlash] = useState(null);
  const [arrows, setArrows] = useState([]);
  const arrowId = useRef(0);

  // Dynamic cinematic parallax
  useFrame(() => {
    if (cameraGroup.current) {
      cameraGroup.current.position.x = THREE.MathUtils.lerp(
        cameraGroup.current.position.x, mouse.x * 1.5, 0.03
      );
      cameraGroup.current.position.y = THREE.MathUtils.lerp(
        cameraGroup.current.position.y, mouse.y * 0.8, 0.03
      );
    }
  });

  // Rapid cinematic arrow spawning (every 2-4 sec)
  useEffect(() => {
    let timeout;
    const spawn = () => {
      const delay = 2000 + Math.random() * 2000;
      timeout = setTimeout(() => {
        const types = ['fire', 'beam', 'glow'];
        const type = types[Math.floor(Math.random() * types.length)];
        const isDeflected = Math.random() > 0.4;
        setArrows(prev => [...prev, { id: arrowId.current++, type, isDeflected }]);
        spawn();
      }, delay);
    };
    spawn();
    return () => clearTimeout(timeout);
  }, []);

  const handleArrowComplete = useCallback((id, isDeflected) => {
    setArrows(prev => prev.filter(a => a.id !== id));
    setHitFlash({ id: Date.now(), isDeflected });
    if (onHit) onHit(isDeflected); 
  }, [onHit]);

  return (
    <group ref={cameraGroup}>
      {/* High-Contrast Environment */}
      <CinematicEnvironment />

      {/* Cinematic Silhouette Characters */}
      <LordRam mouse={mouse} />
      <Ravana hitFlash={hitFlash} mouse={mouse} />

      {/* High-Velocity Projectiles */}
      {arrows.map(a => (
        <ArrowProjectile
          key={a.id}
          id={a.id}
          type={a.type}
          isDeflected={a.isDeflected}
          onComplete={handleArrowComplete}
        />
      ))}

      {/* Cinematic Post-Processing */}
      <EffectComposer disableNormalPass>
        <Bloom 
          luminanceThreshold={0.1} 
          mipmapBlur 
          intensity={1.5} 
          radius={0.4} 
        />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </group>
  );
}
