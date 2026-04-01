import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 600;

/* ── Realistic fire band across the bottom (GPU particles with custom shader) ── */
export default function FireParticles() {
  const pointsRef = useRef();

  const { positions, velocities, lifetimes, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const lifetimes = new Float32Array(PARTICLE_COUNT);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread across the bottom of the screen
      positions[i * 3]     = (Math.random() - 0.5) * 22;   // x  wide spread
      positions[i * 3 + 1] = -4.5 + Math.random() * 2;     // y  bottom
      positions[i * 3 + 2] = Math.random() * 2 - 1;        // z  slight depth

      velocities[i * 3]     = (Math.random() - 0.5) * 0.3;
      velocities[i * 3 + 1] = 0.5 + Math.random() * 1.5;   // upward
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;

      lifetimes[i] = Math.random();
      sizes[i] = 0.3 + Math.random() * 0.5;
    }
    return { positions, velocities, lifetimes, sizes };
  }, []);

  // Custom shader material for fire gradient
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aLifetime;
        attribute float aSize;
        varying float vLifetime;
        uniform float uTime;

        void main() {
          vLifetime = aLifetime;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vLifetime;

        void main() {
          // Circular soft particle
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = smoothstep(0.5, 0.0, dist);
          alpha *= (1.0 - vLifetime) * 0.85;

          // Fire gradient: yellow core → orange → red → transparent
          vec3 yellow = vec3(1.0, 0.95, 0.3);
          vec3 orange = vec3(1.0, 0.45, 0.0);
          vec3 red    = vec3(0.8, 0.1, 0.0);

          vec3 col = mix(yellow, orange, smoothstep(0.0, 0.4, vLifetime));
          col = mix(col, red, smoothstep(0.4, 0.8, vLifetime));

          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const ltAttr  = pointsRef.current.geometry.attributes.aLifetime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // advance lifetime
      ltAttr.array[i] += delta * (0.4 + Math.random() * 0.3);

      if (ltAttr.array[i] > 1) {
        // respawn at bottom
        posAttr.array[i * 3]     = (Math.random() - 0.5) * 22;
        posAttr.array[i * 3 + 1] = -4.5 + Math.random() * 0.5;
        posAttr.array[i * 3 + 2] = Math.random() * 2 - 1;
        ltAttr.array[i] = 0;
      } else {
        // move upward + slight sway
        posAttr.array[i * 3]     += velocities[i * 3] * delta;
        posAttr.array[i * 3 + 1] += velocities[i * 3 + 1] * delta;
        posAttr.array[i * 3 + 2] += velocities[i * 3 + 2] * delta;
      }
    }

    posAttr.needsUpdate = true;
    ltAttr.needsUpdate = true;

    shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points ref={pointsRef} material={shaderMaterial}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aLifetime"
          count={PARTICLE_COUNT}
          array={lifetimes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
    </points>
  );
}
