import React from "react";
import { useCurrentFrame } from "remotion";

export const Barbell3D: React.FC<{ entrance: number }> = ({ entrance }) => {
  const frame = useCurrentFrame();
  const scale = 0.2 + 0.8 * entrance;
  const rotY = frame * 0.01;

  return (
    <group
      scale={scale}
      rotation={[0.05, rotY, Math.PI / 2]}
      position={[0, 0, 0]}
    >
      <mesh castShadow>
        <cylinderGeometry args={[0.055, 0.055, 2.3, 20]} />
        <meshStandardMaterial color="#e7e3d9" roughness={0.4} metalness={0.15} />
      </mesh>
      {[-1, 1].map((side) =>
        [0, 1].map((i) => (
          <mesh
            key={`${side}-${i}`}
            position={[0, side * (0.95 + i * 0.16), 0]}
            castShadow
          >
            <cylinderGeometry
              args={[0.5 - i * 0.08, 0.5 - i * 0.08, 0.12, 32]}
            />
            <meshStandardMaterial color="#efece4" roughness={0.55} />
          </mesh>
        ))
      )}
    </group>
  );
};
