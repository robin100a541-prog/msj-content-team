import React from "react";

const commonProps = {
  viewBox: "0 0 100 100",
  fill: "none",
  stroke: "#ffffff",
  strokeWidth: 3.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Abstract football (soccer ball) -- pentagon panel outline.
export const FootballIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} {...commonProps}>
    <circle cx="50" cy="50" r="38" />
    <polygon points="50,26 68,39 61,60 39,60 32,39" />
    <line x1="50" y1="12" x2="50" y2="26" />
    <line x1="68" y1="39" x2="82" y2="30" />
    <line x1="61" y1="60" x2="70" y2="80" />
    <line x1="39" y1="60" x2="30" y2="80" />
    <line x1="32" y1="39" x2="18" y2="30" />
  </svg>
);

// Tactical formation board -- pitch outline with player markers.
export const TacticalBoardIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} {...commonProps}>
    <rect x="14" y="10" width="72" height="80" rx="4" />
    <line x1="14" y1="50" x2="86" y2="50" />
    <circle cx="50" cy="50" r="12" />
    <circle cx="30" cy="26" r="4.5" fill="#ffffff" stroke="none" />
    <circle cx="70" cy="26" r="4.5" fill="#ffffff" stroke="none" />
    <circle cx="50" cy="20" r="4.5" fill="#ffffff" stroke="none" />
    <circle cx="30" cy="74" r="4.5" fill="#ffffff" stroke="none" />
    <circle cx="70" cy="74" r="4.5" fill="#ffffff" stroke="none" />
    <circle cx="50" cy="80" r="4.5" fill="#ffffff" stroke="none" />
  </svg>
);

// Physical / strength -- minimal dumbbell.
export const FitnessIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} {...commonProps}>
    <line x1="24" y1="50" x2="76" y2="50" />
    <rect x="12" y="36" width="12" height="28" rx="3" />
    <rect x="76" y="36" width="12" height="28" rx="3" />
    <rect x="4" y="42" width="8" height="16" rx="2" />
    <rect x="88" y="42" width="8" height="16" rx="2" />
  </svg>
);
