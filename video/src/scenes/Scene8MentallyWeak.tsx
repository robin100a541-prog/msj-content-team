import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { useBass } from "../hooks/useBass";

const WEAK_FONT_SIZE = 78;

export const Scene8MentallyWeak: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const bass = useBass();

  const fadeInDur = 6;
  const fadeOutDur = 30; // matches the background's final fade-to-black window
  const opacity = interpolate(
    frame,
    [0, fadeInDur, durationInFrames - fadeOutDur, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Strongest bass reaction of the whole video: shake + chromatic glitch.
  const shakeAmount = interpolate(bass, [0, 1], [0.6, 5]);
  const shakeX =
    Math.sin(frame * 3.1) * shakeAmount + Math.sin(frame * 7.7) * shakeAmount * 0.4;
  const shakeY =
    Math.cos(frame * 2.6) * shakeAmount * 0.6;

  const glitchOffset = interpolate(bass, [0, 1], [0.5, 6]);
  const pulseScale = interpolate(bass, [0, 1], [1, 1.06]);

  const textStyle: React.CSSProperties = {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 800,
    fontSize: WEAK_FONT_SIZE,
    letterSpacing: "0.04em",
    whiteSpace: "nowrap",
    // All three layers share the same grid cell, so they stack perfectly
    // centered regardless of text width (unlike position:absolute, which
    // would collapse the container and misalign against its parent).
    gridArea: "1 / 1",
  };

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          display: "grid",
          opacity,
          transform: `translate(${shakeX}px, ${shakeY}px) scale(${pulseScale})`,
        }}
      >
        <div
          style={{
            ...textStyle,
            color: "#6b6459",
            transform: `translate(${-glitchOffset}px, 0)`,
            opacity: 0.5,
          }}
        >
          MENTALLY WEAK
        </div>
        <div
          style={{
            ...textStyle,
            color: "#000000",
            transform: `translate(${glitchOffset}px, 0)`,
            opacity: 0.4,
          }}
        >
          MENTALLY WEAK
        </div>
        <div
          style={{
            ...textStyle,
            color: "#1a1815",
            textShadow: `0 ${8 + glitchOffset}px ${18 + glitchOffset * 3}px rgba(20,17,12,0.3)`,
          }}
        >
          MENTALLY WEAK
        </div>
      </div>
    </AbsoluteFill>
  );
};
