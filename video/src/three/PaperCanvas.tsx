import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { PerspectiveCamera, ContactShadows } from "@react-three/drei";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface PaperCanvasProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

/**
 * Shared studio setup for every 3D icon: soft key/fill lighting, a gentle
 * cinematic dolly + pan, and a soft contact shadow so the model reads as
 * resting on the paper behind it (composited via a transparent canvas).
 */
export const PaperCanvas: React.FC<PaperCanvasProps> = ({
  children,
  width = 1080,
  height = 1920,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Camera stays on-axis (looking straight at the origin) so the model is
  // always screen-centered -- the "pan" comes from a rotation instead of a
  // lateral offset, and there's a brisk dolly-in so the zoom actually reads
  // within these short (1.5-2.5s) scenes.
  const pan = Math.sin(t * 0.9) * 0.09;
  const camZ = 11.5 - Math.min(t * 1.2, 1.4);

  return (
    <ThreeCanvas
      width={width}
      height={height}
      shadows
      dpr={1}
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0, camZ]}
        rotation={[0, pan, 0]}
        fov={30}
      />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[2.4, 4, 3]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <directionalLight position={[-2.8, 1.2, -2.2]} intensity={0.35} />
      <directionalLight position={[0, 1.5, -3.5]} intensity={0.5} color="#ffffff" />
      {children}
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.4}
        scale={6}
        blur={2.4}
        far={1.6}
        color="#2a241c"
        resolution={256}
      />
    </ThreeCanvas>
  );
};
