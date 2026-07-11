import React from "react";
import { useCurrentFrame } from "remotion";

export const Eyeball3D: React.FC<{ entrance: number }> = ({ entrance }) => {
  const frame = useCurrentFrame();
  const scale = 0.15 + 0.95 * entrance;
  const lookX = Math.sin(frame * 0.075) * 0.32;
  const lookY = Math.sin(frame * 0.05) * 0.14;
  const bob = Math.sin(frame * 0.09) * 0.05;

  return (
    <group
      scale={scale}
      rotation={[0.08 + lookY, lookX, 0]}
      position={[0, bob, 0]}
    >
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#f5f2ec" roughness={0.28} />
      </mesh>
      <mesh position={[0, 0, 0.95]}>
        <circleGeometry args={[0.46, 40]} />
        <meshStandardMaterial color="#2a2620" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 1.0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#0a0908" roughness={0.25} />
      </mesh>
      <mesh position={[0.12, 0.14, 1.03]}>
        <circleGeometry args={[0.05, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
};
