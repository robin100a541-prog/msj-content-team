import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { GlowText } from "../components/GlowText";

export const Scene1Hook: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 18, durationInFrames - 22, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 90px",
      }}
    >
      <GlowText fontSize={64} opacity={opacity} bassScale={0.02}>
        I've seen hundreds of
        <br />
        technically gifted players...
      </GlowText>
    </AbsoluteFill>
  );
};
