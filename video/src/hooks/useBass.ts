import { useCurrentFrame, useVideoConfig, staticFile } from "remotion";
import { useWindowedAudioData, visualizeAudio } from "@remotion/media-utils";
import { AUDIO_DURATION_SECONDS } from "../timing";

const VOICEOVER_SRC = staticFile("voiceover.wav");
const WINDOW_IN_SECONDS = 0.6;

/**
 * Low-frequency (bass) amplitude for the current frame, normalized to ~0-1.
 * Smoothed with a short trailing average so reactive motion stays subtle
 * and cinematic instead of jittery.
 */
export const useBass = (): number => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // The video runs a couple seconds past the end of the voiceover file (for
  // the outro fade). Clamp so the analysis window never reads past EOF --
  // the audio is silent there anyway, so freezing the last real reading is
  // visually indistinguishable from computing it.
  const maxSafeFrame = Math.floor(
    (AUDIO_DURATION_SECONDS - WINDOW_IN_SECONDS) * fps
  );
  const safeFrame = Math.min(frame, Math.max(0, maxSafeFrame));

  const { audioData: windowed, dataOffsetInSeconds } = useWindowedAudioData({
    src: VOICEOVER_SRC,
    frame: safeFrame,
    fps,
    windowInSeconds: WINDOW_IN_SECONDS,
  });

  if (!windowed) {
    return 0;
  }

  const frequencies = visualizeAudio({
    fps,
    frame: safeFrame,
    audioData: windowed,
    numberOfSamples: 32,
    dataOffsetInSeconds,
  });

  // Bins ~1-4 (skipping DC) correspond to the lowest frequencies, i.e. bass.
  const bassBins = frequencies.slice(1, 5);
  const rawBass =
    bassBins.reduce((sum, value) => sum + value, 0) / bassBins.length;

  // Raw FFT magnitudes here typically sit well under 1; boost and clamp.
  return Math.max(0, Math.min(1, rawBass * 4));
};
