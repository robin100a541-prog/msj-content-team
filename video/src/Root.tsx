import React from "react";
import { Composition } from "remotion";
import { MentalityVideo } from "./Video";
import { FPS, TOTAL_DURATION_IN_FRAMES } from "./timing";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Mentality"
      component={MentalityVideo}
      durationInFrames={TOTAL_DURATION_IN_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
