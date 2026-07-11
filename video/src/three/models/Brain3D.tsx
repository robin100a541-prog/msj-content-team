import React, { useMemo } from "react";
import * as THREE from "three";
import { useCurrentFrame } from "remotion";

export const Brain3D: React.FC<{ entrance: number }> = ({ entrance }) => {
  const frame = useCurrentFrame();
  const scale = 0.12 + 0.75 * entrance;
  const rotY = frame * 0.03 + entrance * 1.2;
  const bob = Math.sin(frame * 0.08) * 0.05;

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const pos = geo.attributes.position;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = v.clone().normalize();
      // Few, large sinuous lobes -- reads as gyri rather than fine noise.
      const bump =
        0.09 * Math.sin(n.x * 4 + n.y * 3) +
        0.07 * Math.sin(n.y * 5 - n.z * 4) +
        0.05 * Math.sin(n.z * 3 + n.x * 5);
      // Deep central longitudinal fissure splits the hemispheres.
      const centralGroove = Math.exp(-Math.pow(n.x * 5, 2)) * 0.22;
      // Faint front-back crease for extra structure.
      const crossGroove = Math.exp(-Math.pow(n.z * 5, 2)) * 0.05;
      const r = 1 + bump - centralGroove - crossGroove;
      v.copy(n.multiplyScalar(r));
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group scale={scale} rotation={[0.12, rotY, 0]} position={[0, bob, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#f2efe7" roughness={0.55} metalness={0.02} />
      </mesh>
    </group>
  );
};
