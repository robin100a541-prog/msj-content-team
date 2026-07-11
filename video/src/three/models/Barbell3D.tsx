import React from "react";
import { useCurrentFrame } from "remotion";

export const Barbell3D: React.FC<{ entrance: number }> = ({ entrance }) => {
  const frame = useCurrentFrame();
  const scale = 0.13 + 0.85 * entrance;
  const rotY = frame * 0.04;
  const bob = Math.sin(frame * 0.1) * 0.05;

  return (
    <group
      scale={scale}
      rotation={[0.1, rotY, Math.PI / 2]}
      position={[0, bob, 0]}
    >
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 20]} />
        <meshStandardMaterial color="#e7e3d9" roughness={0.4} metalness={0.15} />
      </mesh>
      {[-1, 1].map((side) =>
        [0, 1].map((i) => (
          <mesh
            key={`${side}-${i}`}
            position={[0, side * (0.62 + i * 0.13), 0]}
            castShadow
          >
            <cylinderGeometry
              args={[0.36 - i * 0.06, 0.36 - i * 0.06, 0.11, 32]}
            />
            <meshStandardMaterial color="#efece4" roughness={0.5} />
          </mesh>
        ))
      )}
    </group>
  );
};
