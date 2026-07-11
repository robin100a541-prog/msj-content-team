// Frame map derived from acoustic silence-gap analysis of public/voiceover.mp3
// (44.1kHz stereo, 17.92s). No ASR was available in the build environment, so
// boundaries come from measured pause/gap timestamps in the actual waveform,
// matched against the script's sentence and "..." breaks. If the visual sync
// ever feels off against the real voiceover, nudge these frame numbers --
// everything else in the project reads from here.

export const FPS = 30;

const f = (seconds: number) => Math.round(seconds * FPS);

export const AUDIO_DURATION_SECONDS = 17.92;

export const TIMING = {
  // "I've seen hundreds of technically gifted players..."
  scene1Start: f(0),
  narration1Start: f(1.08),
  scene1End: f(4.14),

  // "...who never made it."
  scene2Start: f(4.14),
  narration2Start: f(4.29),
  scene2End: f(6.01),

  // "And they all made the same mistake."
  scene3Start: f(6.01),
  scene3End: f(8.82),

  // "It was not technical..."
  scene4Start: f(8.82),
  narration4Start: f(9.01),
  scene4End: f(10.62),

  // "It was not tactical..."
  scene5Start: f(10.62),
  narration5Start: f(10.79),
  scene5End: f(12.9),

  // "It was not physical..."
  scene6Start: f(12.9),
  narration6Start: f(13.15),
  scene6End: f(13.93),

  // "It was this..." -> MENTALITY
  scene7Start: f(13.93),
  narration7Start: f(14.0),
  scene7End: f(15.53),

  // "...they were mentally weak." -> MENTALLY WEAK
  scene8Start: f(15.53),
  narration8End: f(17.03),
  scene8End: f(19.0),

  // Fade to black outro
  outroEnd: f(20.0),
} as const;

export const TOTAL_DURATION_IN_FRAMES = TIMING.outroEnd;

export const MYTH_SCENES = [
  {
    key: "technical",
    word: "TECHNICAL",
    start: TIMING.scene4Start,
    end: TIMING.scene4End,
  },
  {
    key: "tactical",
    word: "TACTICAL",
    start: TIMING.scene5Start,
    end: TIMING.scene5End,
  },
  {
    key: "physical",
    word: "PHYSICAL",
    start: TIMING.scene6Start,
    end: TIMING.scene6End,
  },
] as const;
