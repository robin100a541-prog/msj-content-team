import React from "react";
import { interpolate } from "remotion";

const OCTAGON_POINTS =
  "70,10 130,10 190,70 190,130 130,190 70,190 10,130 10,70";

interface GateFrameProps {
  size: number;
  /** 0 = closed (a single unified frame), 1 = fully split apart. */
  progress: number;
  strokeColor?: string;
}

/**
 * A thin-lined octagon frame that splits down the middle and slides its two
 * halves apart -- the "gate" reveal used before every 3D icon appears.
 */
export const GateFrame: React.FC<GateFrameProps> = ({
  size,
  progress,
  strokeColor = "#1c1a16",
}) => {
  const eased = interpolate(progress, [0, 1], [0, 1], {
    easing: (t) => t * t * (3 - 2 * t),
  });
  const opacity = interpolate(progress, [0, 0.85, 1], [1, 1, 0]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ position: "absolute", top: 0, left: 0, opacity }}
    >
      <defs>
        <clipPath id="gateLeftHalf">
          <rect x="0" y="0" width="100" height="200" />
        </clipPath>
        <clipPath id="gateRightHalf">
          <rect x="100" y="0" width="100" height="200" />
        </clipPath>
      </defs>
      <g
        clipPath="url(#gateLeftHalf)"
        transform={`translate(${-eased * 62}, 0)`}
      >
        <polygon
          points={OCTAGON_POINTS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={2.5}
        />
      </g>
      <g
        clipPath="url(#gateRightHalf)"
        transform={`translate(${eased * 62}, 0)`}
      >
        <polygon
          points={OCTAGON_POINTS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={2.5}
        />
      </g>
    </svg>
  );
};
