import React, { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame } from "remotion";

export const Brain3D: React.FC<{ entrance: number }> = ({ entrance }) => {
  const frame = useCurrentFrame();
  const scale = 0.2 + 0.8 * entrance;
  const rotY = frame * 0.008;

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 48, 48);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = v.clone().normalize();
      const bump =
        0.05 * Math.sin(n.x * 10 + n.y * 6) +
        0.04 * Math.sin(n.y * 14 + n.z * 8) +
        0.035 * Math.sin(n.z * 12 + n.x * 9);
      const groove = Math.exp(-Math.pow(n.x * 6, 2)) * 0.12;
      const r = 1 + bump - groove;
      v.copy(n.multiplyScalar(r));
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group scale={scale} rotation={[0.1, rotY, 0]} position={[0, 0, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#f2efe7" roughness={0.6} metalness={0.02} />
      </mesh>
    </group>
  );
};
