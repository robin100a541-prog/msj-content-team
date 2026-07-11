import React from "react";
import { interpolate } from "remotion";
import { useBass } from "../hooks/useBass";

interface InkTextProps {
  children: React.ReactNode;
  fontSize: number;
  color?: string;
  fontWeight?: number;
  /** Letter-spacing the text settles to once fully tracked-in. */
  letterSpacing?: string;
  opacity?: number;
  scale?: number;
  /** 0-1 local progress driving the tracking-in (wide -> normal) animation. */
  trackIn?: number;
  bassScale?: number;
  style?: React.CSSProperties;
}

/**
 * Shared text primitive: dark ink on paper, with a soft contact-shadow
 * (rather than a glow) and a premium tracking-in (letter-spacing) entrance.
 * Bass reactivity is a faint scale pulse and a slightly deeper shadow --
 * ink on paper doesn't glow, so bass reads as weight, not brightness.
 */
export const InkText: React.FC<InkTextProps> = ({
  children,
  fontSize,
  color = "#1c1a16",
  fontWeight = 700,
  letterSpacing = "0.01em",
  opacity = 1,
  scale = 1,
  trackIn = 1,
  bassScale = 0.012,
  style,
}) => {
  const bass = useBass();
  const pulse = interpolate(bass, [0, 1], [1, 1 + bassScale]);
  const shadowDepth = interpolate(bass, [0, 1], [10, 16]);
  const shadowAlpha = interpolate(bass, [0, 1], [0.14, 0.22]);

  const trackedSpacing = interpolate(trackIn, [0, 1], [0.34, 1]);

  return (
    <div
      style={{
        fontFamily:
          "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontWeight,
        fontSize,
        color,
        letterSpacing: `calc(${letterSpacing} * ${trackedSpacing})`,
        opacity,
        transform: `scale(${scale * pulse})`,
        textAlign: "center",
        textShadow: `0 ${shadowDepth * 0.35}px ${shadowDepth}px rgba(30,26,20,${shadowAlpha})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
