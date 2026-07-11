import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { InkText } from "../components/InkText";
import { StampX } from "../components/StampX";
import { GateFrame } from "../components/GateFrame";
import { PaperCanvas } from "../three/PaperCanvas";
import { useBass } from "../hooks/useBass";

interface SceneMythBusterProps {
  durationInFrames: number;
  word: string;
  Model: React.FC<{ entrance: number }>;
}

const GATE_SIZE = 380;

export const SceneMythBuster: React.FC<SceneMythBusterProps> = ({
  durationInFrames,
  word,
  Model,
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

  const gateDur = Math.max(6, durationInFrames * 0.32);
  const gateProgress = interpolate(frame, [0, gateDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const modelEntrance = interpolate(
    frame,
    [gateDur * 0.2, gateDur + 4],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const trackIn = interpolate(frame, [gateDur, gateDur + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const xStartAt = durationInFrames * 0.6;
  const xDrawDur = Math.max(4, durationInFrames * 0.28);
  const xProgress = interpolate(
    frame,
    [xStartAt, xStartAt + xDrawDur],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const xOpacity = interpolate(frame, [xStartAt - 1, xStartAt + 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bounce = interpolate(bass, [0, 1], [0, 4]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <PaperCanvas>
        <Model entrance={modelEntrance} />
      </PaperCanvas>

      <AbsoluteFill
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div
          style={{
            position: "relative",
            width: GATE_SIZE,
            height: GATE_SIZE,
            transform: `translateY(-${bounce}px)`,
          }}
        >
          <GateFrame size={GATE_SIZE} progress={gateProgress} />
          <StampX
            size={GATE_SIZE * 0.82}
            progress={xProgress}
            opacity={xOpacity}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 480,
        }}
      >
        <InkText
          fontSize={50}
          letterSpacing="0.14em"
          bassScale={0.02}
          trackIn={trackIn}
        >
          {word}
        </InkText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
