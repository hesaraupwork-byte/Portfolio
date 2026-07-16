'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';

function DistortedShape() {
  const meshRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;

    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
    meshRef.current.rotation.x += pointer.current.y * 0.05 * delta;
    meshRef.current.rotation.y += pointer.current.x * 0.05 * delta;
  });

  return (
    <Icosahedron ref={meshRef} args={[1.6, 4]}>
      <MeshDistortMaterial
        color="#d6ff3f"
        distort={0.35}
        speed={1.5}
        roughness={0.2}
        metalness={0.3}
        wireframe
      />
    </Icosahedron>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#d6ff3f" />
      <DistortedShape />
    </Canvas>
  );
}
