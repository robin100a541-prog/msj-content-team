import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { PlayerSilhouette } from "../components/PlayerSilhouette";

interface CardSpec {
  x: number;
  appearAt: number;
  fallAt: number;
  rotateDir: number;
}

const CARD_SPACING = 9;
const APPEAR_DUR = 9;
const FALL_DUR = 15;
const X_OFFSETS = [-260, -87, 87, 260];

const buildCards = (): CardSpec[] =>
  X_OFFSETS.map((x, i) => ({
    x,
    appearAt: 3 + i * CARD_SPACING,
    fallAt: 3 + i * CARD_SPACING + APPEAR_DUR + 9,
    rotateDir: i % 2 === 0 ? 1 : -1,
  }));

const Card: React.FC<{ spec: CardSpec; frame: number }> = ({
  spec,
  frame,
}) => {
  const { x, appearAt, fallAt, rotateDir } = spec;

  const appearProgress = interpolate(
    frame,
    [appearAt, appearAt + APPEAR_DUR],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const fallProgress = interpolate(
    frame,
    [fallAt, fallAt + FALL_DUR],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = interpolate(appearProgress, [0, 1], [0, 0.92]) *
    interpolate(fallProgress, [0, 1], [1, 0]);
  const scale = interpolate(appearProgress, [0, 1], [0.7, 1]);
  const translateY =
    interpolate(appearProgress, [0, 1], [40, 0]) +
    interpolate(fallProgress, [0, 1], [0, 260]);
  const rotate = interpolate(fallProgress, [0, 1], [0, 22 * rotateDir]);

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${x}px - 55px)`,
        top: "38%",
        opacity,
        transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 110,
          padding: "18px 0",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(255,255,255,0.04)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PlayerSilhouette size={56} color="rgba(255,255,255,0.85)" />
      </div>
    </div>
  );
};

export const Scene2Silhouettes: React.FC<{ durationInFrames: number }> = () => {
  const frame = useCurrentFrame();
  const cards = buildCards();

  return (
    <AbsoluteFill>
      {cards.map((spec, i) => (
        <Card key={i} spec={spec} frame={frame} />
      ))}
    </AbsoluteFill>
  );
};
