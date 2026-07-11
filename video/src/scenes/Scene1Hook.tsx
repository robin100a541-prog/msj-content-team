import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { InkText } from "../components/InkText";

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
  const trackIn = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kenBurns = interpolate(frame, [0, durationInFrames], [1, 1.04]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: "0 90px",
        transform: `scale(${kenBurns})`,
      }}
    >
      <InkText
        fontSize={64}
        opacity={opacity}
        bassScale={0.02}
        trackIn={trackIn}
      >
        I've seen hundreds of
        <br />
        technically gifted players...
      </InkText>
    </AbsoluteFill>
  );
};
