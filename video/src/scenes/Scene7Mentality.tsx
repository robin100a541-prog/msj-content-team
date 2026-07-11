import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { GlowText } from "../components/GlowText";
import { useBass } from "../hooks/useBass";

export const Scene7Mentality: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const bass = useBass();

  const fadeIn = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = fadeIn * fadeOut;

  // Dramatic small-to-very-large scale across the whole scene.
  const growth = interpolate(frame, [0, durationInFrames], [0.2, 1.55], {
    easing: (t) => t * t * (3 - 2 * t),
    extrapolateRight: "clamp",
  });
  const bassKick = interpolate(bass, [0, 1], [1, 1.05]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <GlowText
        fontSize={90}
        opacity={opacity}
        scale={growth * bassKick}
        letterSpacing="0.06em"
        bassScale={0.03}
        bassGlow={30}
      >
        MENTALITY
      </GlowText>
    </AbsoluteFill>
  );
};
