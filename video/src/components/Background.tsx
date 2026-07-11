import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TIMING } from "../timing";

const FLAT_BG = "#f7f5f0";

/**
 * Flat, plain background -- no texture, no vignette. The only motion here
 * is the fade to black over the very last frames of the composition.
 */
export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  const outroBlack = interpolate(
    frame,
    [TIMING.outroEnd - 24, TIMING.outroEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: FLAT_BG }}>
      <AbsoluteFill
        style={{ backgroundColor: "#000000", opacity: outroBlack }}
      />
    </AbsoluteFill>
  );
};
