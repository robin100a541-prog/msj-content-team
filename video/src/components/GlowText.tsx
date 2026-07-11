import React from "react";
import { interpolate } from "remotion";
import { useBass } from "../hooks/useBass";

interface GlowTextProps {
  children: React.ReactNode;
  fontSize: number;
  color?: string;
  fontWeight?: number;
  letterSpacing?: string;
  opacity?: number;
  scale?: number;
  bassScale?: number;
  bassGlow?: number;
  style?: React.CSSProperties;
}

/**
 * Shared text primitive: large, white, condensed, with a bass-reactive glow
 * and a tiny bass-reactive scale pulse layered on top of whatever animation
 * scale the caller already applied.
 */
export const GlowText: React.FC<GlowTextProps> = ({
  children,
  fontSize,
  color = "#ffffff",
  fontWeight = 800,
  letterSpacing = "0.01em",
  opacity = 1,
  scale = 1,
  bassScale = 0.015,
  bassGlow = 14,
  style,
}) => {
  const bass = useBass();
  const pulse = interpolate(bass, [0, 1], [1, 1 + bassScale]);
  const glowSpread = interpolate(bass, [0, 1], [6, 6 + bassGlow]);
  const glowAlpha = interpolate(bass, [0, 1], [0.35, 0.75]);

  return (
    <div
      style={{
        fontFamily:
          "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontWeight,
        fontSize,
        color,
        letterSpacing,
        opacity,
        transform: `scale(${scale * pulse})`,
        textAlign: "center",
        textShadow: `0 0 ${glowSpread}px rgba(255,255,255,${glowAlpha}), 0 0 ${
          glowSpread * 2.5
        }px rgba(255,255,255,${glowAlpha * 0.4})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
