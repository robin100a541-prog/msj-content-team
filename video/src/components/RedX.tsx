import React from "react";
import { interpolate } from "remotion";

interface RedXProps {
  size: number;
  /** 0 -> not drawn, 1 -> fully drawn/slammed in */
  progress: number;
  opacity?: number;
}

/**
 * A red "X" that slams over an icon. `progress` drives both a quick
 * scale-in punch and a stroke draw-on, so it reads as a hit rather than a
 * static overlay fading up.
 */
export const RedX: React.FC<RedXProps> = ({ size, progress, opacity = 1 }) => {
  const scale = interpolate(progress, [0, 0.6, 1], [1.6, 0.95, 1]);
  const dash = interpolate(progress, [0, 1], [140, 0]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <line
        x1="18"
        y1="18"
        x2="82"
        y2="82"
        stroke="#ff2d2d"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={140}
        strokeDashoffset={dash}
      />
      <line
        x1="82"
        y1="18"
        x2="18"
        y2="82"
        stroke="#ff2d2d"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={140}
        strokeDashoffset={dash}
      />
    </svg>
  );
};
