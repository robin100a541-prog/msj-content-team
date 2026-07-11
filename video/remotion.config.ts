import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Software-rendered WebGL (no GPU in this sandbox) makes the 3D-icon frames
// much slower than typical Remotion frames -- raise the per-frame timeout
// and cap concurrency so slow frames don't starve each other for CPU.
Config.setTimeoutInMilliseconds(120000);
Config.setConcurrency(1);

const localChromium =
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
Config.setBrowserExecutable(localChromium);
