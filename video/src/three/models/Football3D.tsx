import React, { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame } from "remotion";

export const Football3D: React.FC<{ entrance: number }> = ({ entrance }) => {
  const frame = useCurrentFrame();
  const scale = 0.15 + 0.95 * entrance;
  const rotY = frame * 0.045 + entrance * 1.4;
  const bob = Math.sin(frame * 0.09) * 0.06;

  const edges = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 1);
    return new THREE.EdgesGeometry(geo, 1);
  }, []);

  return (
    <group scale={scale} rotation={[0.2, rotY, 0]} position={[0, bob, 0]}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#f2efe8" roughness={0.5} metalness={0.08} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#1c1a16" transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
};
