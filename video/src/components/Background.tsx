import React from "react";
import { AbsoluteFill, interpolate, interpolateColors, useCurrentFrame } from "remotion";
import { TIMING } from "../timing";
import { useBass } from "../hooks/useBass";

// One continuous color timeline for the whole video -- scenes never swap
// backgrounds abruptly, they just live on top of this slowly evolving field.
const STOPS: [number, string][] = [
  [TIMING.scene1Start, "#000000"],
  [TIMING.scene2Start, "#000000"],
  [TIMING.scene2End, "#0c0e16"],
  [TIMING.scene3End, "#12141f"],
  [Math.round((TIMING.scene4Start + TIMING.scene6End) / 2), "#0a0a0e"],
  [TIMING.scene6End, "#08080b"],
  [TIMING.scene7End, "#030304"],
  [TIMING.scene8End, "#020102"],
  [TIMING.outroEnd, "#000000"],
];

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const bass = useBass();

  const inputRange = STOPS.map((s) => s[0]);
  const outputRange = STOPS.map((s) => s[1]);
  const baseColor = interpolateColors(frame, inputRange, outputRange);

  // Background "breathes" subtly with the bass -- kept small so it reads as
  // cinematic ambience rather than a strobe. Animating the gradient's own
  // radius/opacity (rather than a CSS transform on the layer) avoids
  // compositing seams under software rendering.
  const glow = interpolate(bass, [0, 1], [0.08, 0.22]);
  const radius = interpolate(bass, [0, 1], [58, 64]);

  return (
    <AbsoluteFill style={{ backgroundColor: baseColor }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 42%, rgba(255,255,255,${glow}) 0%, rgba(255,255,255,0) ${radius}%)`,
        }}
      />
    </AbsoluteFill>
  );
};
