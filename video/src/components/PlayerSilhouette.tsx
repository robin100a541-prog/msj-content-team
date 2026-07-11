import React from "react";

// Abstract player silhouette: head, torso, one leg mid-stride -- deliberately
// generic so it reads as "a player" rather than any specific pose.
export const PlayerSilhouette: React.FC<{ size: number; color?: string }> = ({
  size,
  color = "#ffffff",
}) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 60 84" fill={color}>
    <circle cx="30" cy="12" r="10" />
    <path d="M30 24 C16 24 12 34 12 46 L20 46 L22 78 L30 78 L31 50 L32 78 L40 78 L42 46 L48 46 C48 34 44 24 30 24 Z" />
  </svg>
);
