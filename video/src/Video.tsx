import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Background } from "./components/Background";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Silhouettes } from "./scenes/Scene2Silhouettes";
import { Scene3Mistake } from "./scenes/Scene3Mistake";
import { SceneMythBuster } from "./scenes/SceneMythBuster";
import { Scene7Mentality } from "./scenes/Scene7Mentality";
import { Scene8MentallyWeak } from "./scenes/Scene8MentallyWeak";
import { Football3D } from "./three/models/Football3D";
import { Eyeball3D } from "./three/models/Eyeball3D";
import { Barbell3D } from "./three/models/Barbell3D";
import { TIMING, MYTH_SCENES } from "./timing";

const MODELS: Record<string, React.FC<{ entrance: number }>> = {
  technical: Football3D,
  tactical: Eyeball3D,
  physical: Barbell3D,
};

export const MentalityVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#f8f6f1" }}>
      <Background />

      <Audio src={staticFile("voiceover.wav")} />

      <Sequence
        from={TIMING.scene1Start}
        durationInFrames={TIMING.scene1End - TIMING.scene1Start}
      >
        <Scene1Hook durationInFrames={TIMING.scene1End - TIMING.scene1Start} />
      </Sequence>

      <Sequence
        from={TIMING.scene2Start}
        durationInFrames={TIMING.scene2End - TIMING.scene2Start}
      >
        <Scene2Silhouettes
          durationInFrames={TIMING.scene2End - TIMING.scene2Start}
        />
      </Sequence>

      <Sequence
        from={TIMING.scene3Start}
        durationInFrames={TIMING.scene3End - TIMING.scene3Start}
      >
        <Scene3Mistake durationInFrames={TIMING.scene3End - TIMING.scene3Start} />
      </Sequence>

      {MYTH_SCENES.map((scene) => (
        <Sequence
          key={scene.key}
          from={scene.start}
          durationInFrames={scene.end - scene.start}
        >
          <SceneMythBuster
            durationInFrames={scene.end - scene.start}
            word={scene.word}
            Model={MODELS[scene.key]}
          />
        </Sequence>
      ))}

      <Sequence
        from={TIMING.scene7Start}
        durationInFrames={TIMING.scene7End - TIMING.scene7Start}
      >
        <Scene7Mentality
          durationInFrames={TIMING.scene7End - TIMING.scene7Start}
        />
      </Sequence>

      <Sequence
        from={TIMING.scene8Start}
        durationInFrames={TIMING.outroEnd - TIMING.scene8Start}
      >
        <Scene8MentallyWeak
          durationInFrames={TIMING.outroEnd - TIMING.scene8Start}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
