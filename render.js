const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const FFMPEG = '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux';
const HTML = process.argv[2];
const OUT_PREFIX = process.argv[3];
const DURATION_MS = parseInt(process.argv[4] || '5000', 10);
const SCALE = parseInt(process.argv[5] || '2', 10);
const FPS = 60;
const W = 1920, H = 1080;

function sh(cmd, args) {
  return new Promise((res, rej) => {
    const p = spawn('bash', ['-c', cmd], { stdio: ['ignore', 'inherit', 'inherit'] });
    p.on('close', c => c === 0 ? res() : rej(new Error(cmd + ' exit ' + c)));
  });
}

(async () => {
  const dir = path.join('/tmp/claude-0', 'frames_' + path.basename(OUT_PREFIX));
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--force-color-profile=srgb']
  });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
  await page.goto('file://' + path.resolve(HTML));
  await page.waitForFunction('window.__ready === true');

  const total = Math.round(DURATION_MS / 1000 * FPS);
  const t0 = Date.now();
  for (let f = 0; f < total; f++) {
    await page.evaluate(t => window.seek(t), f * (1000 / FPS));
    await page.screenshot({ path: path.join(dir, `f${String(f).padStart(5,'0')}.png`), omitBackground: true, type: 'png' });
    if (f % 60 === 0) console.log('captured', f, '/', total, ((Date.now()-t0)/1000).toFixed(1)+'s');
  }
  await browser.close();
  console.log('capture done', ((Date.now()-t0)/1000).toFixed(1)+'s — encoding...');

  // 1) Transparent VP8/WebM (alpha) for the editor
  await sh(`cat ${dir}/f*.png | ${FFMPEG} -y -f image2pipe -framerate ${FPS} -i pipe:0 ` +
           `-c:v libvpx -pix_fmt yuva420p -auto-alt-ref 0 -b:v 8M -crf 10 ${OUT_PREFIX}.webm`);

  // 2) Opaque-over-black preview WebM for instant in-chat viewing
  await sh(`cat ${dir}/f*.png | ${FFMPEG} -y -f lavfi -i color=c=black:s=${W*SCALE}x${H*SCALE}:r=${FPS} ` +
           `-f image2pipe -framerate ${FPS} -i pipe:0 ` +
           `-filter_complex "[0:v][1:v]overlay=shortest=1,format=yuv420p" ` +
           `-c:v libvpx -b:v 5M ${OUT_PREFIX}_preview.webm`);

  console.log('DONE', OUT_PREFIX);
})().catch(e => { console.error(e); process.exit(1); });
