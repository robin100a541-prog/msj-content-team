import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GlowText } from "../components/GlowText";

export const Scene3Mistake: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.6 },
  });
  const scale = interpolate(entrance, [0, 1], [0.55, 1]);

  const opacity = interpolate(
    frame,
    [0, 14, durationInFrames - 16, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <GlowText
        fontSize={70}
        opacity={opacity}
        scale={scale}
        bassScale={0.025}
        bassGlow={20}
      >
        And they all made
        <br />
        the same mistake.
      </GlowText>
    </AbsoluteFill>
  );
};
