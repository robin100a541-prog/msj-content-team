import React from "react";
import { useCurrentFrame } from "remotion";

export const Eyeball3D: React.FC<{ entrance: number }> = ({ entrance }) => {
  const frame = useCurrentFrame();
  const scale = 0.2 + 0.8 * entrance;
  const sway = Math.sin(frame * 0.045) * 0.12;

  return (
    <group scale={scale} rotation={[0.05, sway, 0]} position={[0, 0, 0]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#f5f2ec" roughness={0.3} />
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
