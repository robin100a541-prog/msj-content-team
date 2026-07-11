import React from "react";
import { interpolate } from "remotion";

interface StampXProps {
  size: number;
  /** 0 -> not stamped, 1 -> fully stamped down */
  progress: number;
  opacity?: number;
}

const INK = "#221f1a";

/**
 * A rubber-stamp style rejection mark: a rough ring + "X", slightly
 * rotated and double-stroked to read as pressed ink rather than a flat
 * vector overlay. `progress` drives a quick punch-down and a stroke
 * draw-on, so it lands like a stamp hitting paper.
 */
export const StampX: React.FC<StampXProps> = ({
  size,
  progress,
  opacity = 1,
}) => {
  const scale = interpolate(progress, [0, 0.55, 1], [1.7, 0.92, 1]);
  const rotate = interpolate(progress, [0, 1], [-14, -7]);
  const dash = interpolate(progress, [0, 1], [150, 0]);
  const ringDash = interpolate(progress, [0, 1], [276, 0]);
  const inkAlpha = interpolate(progress, [0, 0.15, 1], [0, 0.85, 0.85]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        opacity: opacity * inkAlpha,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
      }}
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke={INK}
        strokeWidth={3.5}
        strokeDasharray={276}
        strokeDashoffset={ringDash}
        opacity={0.8}
      />
      <line
        x1="22"
        y1="22"
        x2="78"
        y2="78"
        stroke={INK}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={150}
        strokeDashoffset={dash}
      />
      <line
        x1="78"
        y1="22"
        x2="22"
        y2="78"
        stroke={INK}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={150}
        strokeDashoffset={dash}
      />
    </svg>
  );
};
