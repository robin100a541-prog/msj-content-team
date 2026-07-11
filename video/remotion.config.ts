import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

const localChromium =
  "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
Config.setBrowserExecutable(localChromium);
