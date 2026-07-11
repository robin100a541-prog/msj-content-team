import React, { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame } from "remotion";

export const Football3D: React.FC<{ entrance: number }> = ({ entrance }) => {
  const frame = useCurrentFrame();
  const scale = 0.2 + 0.8 * entrance;
  const rotY = frame * 0.012 + entrance * 0.6;

  const edges = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 1);
    return new THREE.EdgesGeometry(geo, 1);
  }, []);

  return (
    <group scale={scale} rotation={[0.15, rotY, 0]} position={[0, 0, 0]}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#f2efe8" roughness={0.55} metalness={0.05} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#1c1a16" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
};
