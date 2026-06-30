const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const path = require('path');

const FFMPEG = '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux';
const HTML = process.argv[2];
const OUT_PREFIX = process.argv[3];
const DURATION_MS = parseInt(process.argv[4] || '5000', 10);
const SCALE = parseInt(process.argv[5] || '2', 10);
const FPS = 60;
const W = 1920, H = 1080;

function runFFmpeg(args) {
  return new Promise((resolve, reject) => {
    const p = spawn(FFMPEG, args, { stdio: ['pipe', 'inherit', 'inherit'] });
    p.on('close', c => c === 0 ? resolve() : reject(new Error('ffmpeg exit ' + c)));
    p.on('error', reject);
    return p;
  });
}

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--force-color-profile=srgb']
  });
  const page = await browser.newPage({
    viewport: { width: W, height: H },
    deviceScaleFactor: SCALE
  });
  await page.goto('file://' + path.resolve(HTML));
  await page.waitForFunction('window.__ready === true');

  const totalFrames = Math.round(DURATION_MS / 1000 * FPS);

  // Two ffmpeg pipes: transparent VP8/webm (alpha) + opaque-over-black webm preview
  const alpha = spawn(FFMPEG, [
    '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
    '-c:v', 'libvpx', '-pix_fmt', 'yuva420p', '-auto-alt-ref', '0',
    '-b:v', '6M', '-crf', '12', OUT_PREFIX + '.webm'
  ], { stdio: ['pipe', 'inherit', 'inherit'] });

  const prev = spawn(FFMPEG, [
    '-y', '-f', 'image2pipe', '-framerate', String(FPS), '-i', 'pipe:0',
    '-filter_complex', 'color=c=black:s=' + (W*SCALE) + 'x' + (H*SCALE) + ':r=' + FPS + '[bg];[bg][0:v]overlay=shortest=1,format=yuv420p',
    '-c:v', 'libvpx', '-b:v', '4M', OUT_PREFIX + '_preview.webm'
  ], { stdio: ['pipe', 'inherit', 'inherit'] });

  const writeFrame = (stream, buf) => new Promise(res => {
    if (!stream.write(buf)) stream.once('drain', res); else res();
  });

  for (let f = 0; f < totalFrames; f++) {
    const t = f * (1000 / FPS);
    await page.evaluate(time => window.seek(time), t);
    const buf = await page.screenshot({ omitBackground: true, type: 'png' });
    await writeFrame(alpha.stdin, buf);
    await writeFrame(prev.stdin, buf);
    if (f % 30 === 0) console.log('frame', f, '/', totalFrames);
  }

  alpha.stdin.end();
  prev.stdin.end();
  await browser.close();

  await Promise.all([
    new Promise((r, j) => alpha.on('close', c => c === 0 ? r() : j(new Error('alpha ' + c)))),
    new Promise((r, j) => prev.on('close', c => c === 0 ? r() : j(new Error('prev ' + c)))),
  ]);
  console.log('DONE', OUT_PREFIX);
})().catch(e => { console.error(e); process.exit(1); });
