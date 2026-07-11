import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { GlowText } from "../components/GlowText";
import { RedX } from "../components/RedX";
import { useBass } from "../hooks/useBass";

interface SceneMythBusterProps {
  durationInFrames: number;
  word: string;
  Icon: React.FC<{ size: number }>;
}

export const SceneMythBuster: React.FC<SceneMythBusterProps> = ({
  durationInFrames,
  word,
  Icon,
}) => {
  const frame = useCurrentFrame();
  const bass = useBass();

  const fadeDur = Math.max(4, Math.min(8, Math.floor(durationInFrames * 0.18)));
  const opacity = interpolate(
    frame,
    [0, fadeDur, durationInFrames - fadeDur, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const iconScale = interpolate(frame, [0, fadeDur], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bounce = interpolate(bass, [0, 1], [0, 5]);

  const xStartAt = durationInFrames * 0.42;
  const xDrawDur = Math.max(4, durationInFrames * 0.3);
  const xProgress = interpolate(frame, [xStartAt, xStartAt + xDrawDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const xOpacity = interpolate(frame, [xStartAt - 1, xStartAt + 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const iconSize = 108;

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            position: "relative",
            width: iconSize,
            height: iconSize,
            transform: `translateY(-${bounce}px) scale(${iconScale})`,
          }}
        >
          <Icon size={iconSize} />
          <RedX size={iconSize} progress={xProgress} opacity={xOpacity} />
        </div>
        <div style={{ marginTop: 26 }}>
          <GlowText fontSize={52} letterSpacing="0.08em" bassScale={0.02}>
            {word}
          </GlowText>
        </div>
      </div>
    </AbsoluteFill>
  );
};
