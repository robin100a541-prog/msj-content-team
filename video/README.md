# Mentality — Remotion video

Cinematic 30fps vertical (1080x1920) video for the "technically gifted but
mentally weak" hook, built with [Remotion](https://www.remotion.dev).

## Structure

- `public/voiceover.wav` — the voiceover track (converted from the provided
  audio; `useWindowedAudioData` requires WAV, not MP3).
- `src/timing.ts` — the single source of truth for scene timing, in frames.
  Boundaries were derived from acoustic silence-gap analysis of the actual
  voiceover (no ASR/transcription service was reachable in the build
  environment), matched against the script's sentence and "..." breaks.
  If a cut ever feels off against the real audio, adjust the frame numbers
  here — every scene reads its timing from this file.
- `src/hooks/useBass.ts` — extracts a smoothed low-frequency (bass) amplitude
  per frame via `@remotion/media-utils`, used everywhere for subtle
  audio-reactive scale/opacity/glow.
- `src/components/Background.tsx` — one continuous color/gradient timeline
  for the whole video, so scenes never hard-cut backgrounds.
- `src/scenes/*` — one component per beat (opening hook, falling player
  cards, the mistake line, the technical/tactical/physical myth-busting
  triplet, the MENTALITY reveal, and the MENTALLY WEAK glitch).

## Commands

```bash
npm install
npm start          # Remotion Studio (live preview/scrubbing)
npm run build      # renders out/mentality.mp4
npm run still      # renders a single still frame for a quick check
```

Rendering uses the sandbox's pre-installed headless Chromium
(`remotion.config.ts` points `browserExecutable` at it) since there's no
internet access to download Remotion's own browser binary in this
environment. On a normal machine you can remove that override.
