import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { InkText } from "../components/InkText";
import { GateFrame } from "../components/GateFrame";
import { PaperCanvas } from "../three/PaperCanvas";
import { Brain3D } from "../three/models/Brain3D";
import { useBass } from "../hooks/useBass";

const GATE_SIZE = 340;

export const Scene7Mentality: React.FC<{ durationInFrames: number }> = ({
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bass = useBass();

  const fadeIn = interpolate(frame, [0, 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const opacity = fadeIn * fadeOut;

  // The gate opens fast and the brain gets a brief moment before the
  // typography takes over and grows to fill the frame.
  const gateDur = 12;
  const gateProgress = interpolate(frame, [0, gateDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const brainEntrance = spring({
    frame: frame - 2,
    fps,
    config: { damping: 11, stiffness: 140, mass: 0.7 },
  });
  const brainFadeOut = interpolate(
    frame,
    [durationInFrames * 0.42, durationInFrames * 0.62],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Dramatic small-to-very-large scale across the whole scene.
  const growth = interpolate(frame, [0, durationInFrames], [0.2, 1.55], {
    easing: (t) => t * t * (3 - 2 * t),
    extrapolateRight: "clamp",
  });
  const bassKick = interpolate(bass, [0, 1], [1, 1.05]);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ opacity: brainFadeOut }}>
        <PaperCanvas>
          <Brain3D entrance={brainEntrance} />
        </PaperCanvas>
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div
            style={{
              position: "relative",
              width: GATE_SIZE,
              height: GATE_SIZE,
            }}
          >
            <GateFrame size={GATE_SIZE} progress={gateProgress} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      <InkText
        fontSize={90}
        opacity={opacity}
        scale={growth * bassKick}
        letterSpacing="0.06em"
        bassScale={0.03}
        trackIn={interpolate(frame, [0, durationInFrames * 0.7], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      >
        MENTALITY
      </InkText>
    </AbsoluteFill>
  );
};
