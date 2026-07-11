import React from "react";
import {
  AbsoluteFill,
  interpolate,
  interpolateColors,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { TIMING } from "../timing";
import { useBass } from "../hooks/useBass";

// One continuous paper-tone timeline for the whole video -- scenes never
// swap backgrounds abruptly, they just live on top of this slowly evolving
// field. Stays inside a warm-white -> gray range; only the vignette and the
// final outro go fully dark/black.
const STOPS: [number, string][] = [
  [TIMING.scene1Start, "#f8f6f1"],
  [TIMING.scene2End, "#f4f1ea"],
  [TIMING.scene3End, "#f1eee6"],
  [Math.round((TIMING.scene4Start + TIMING.scene6End) / 2), "#eeeae1"],
  [TIMING.scene6End, "#ece7dd"],
  [TIMING.scene7End, "#e8e3d8"],
  [TIMING.scene8End, "#ddd6c8"],
];

// Vignette darkness ramps up toward the finale so the mood turns heavier
// right as "mentally weak" lands, without ever leaving the paper palette.
const VIGNETTE_STOPS: [number, number][] = [
  [TIMING.scene1Start, 0.16],
  [TIMING.scene3End, 0.2],
  [TIMING.scene6End, 0.26],
  [TIMING.scene7End, 0.36],
  [TIMING.outroEnd, 0.72],
];

const GRAIN_SRC = staticFile("textures/paper-grain.jpg");

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const bass = useBass();

  const baseColor = interpolateColors(
    frame,
    STOPS.map((s) => s[0]),
    STOPS.map((s) => s[1])
  );

  const vignetteBase = interpolate(
    frame,
    VIGNETTE_STOPS.map((s) => s[0]),
    VIGNETTE_STOPS.map((s) => s[1])
  );
  // Background "breathes" subtly with the bass -- kept small so it reads as
  // cinematic ambience rather than a strobe.
  const vignette = vignetteBase + interpolate(bass, [0, 1], [0, 0.05]);

  // Final fade to black over the very last frames of the composition.
  const outroBlack = interpolate(
    frame,
    [TIMING.outroEnd - 24, TIMING.outroEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: baseColor }}>
      <AbsoluteFill
        style={{
          backgroundImage: `url(${GRAIN_SRC})`,
          backgroundSize: "cover",
          opacity: 0.16,
          mixBlendMode: "multiply",
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 42%, rgba(0,0,0,0) 42%, rgba(20,18,14,${vignette}) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{ backgroundColor: "#000000", opacity: outroBlack }}
      />
    </AbsoluteFill>
  );
};
