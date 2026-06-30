const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const FFMPEG = '/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux';
const HTML = process.argv[2];
const OUT = process.argv[3];            // output .webm path
const DURATION_MS = parseInt(process.argv[4] || '5000', 10);
const SCALE = parseInt(process.argv[5] || '2', 10);
const BG = process.argv[6] || '#00b140'; // chroma key green by default
const FPS = 60;
const W = 1920, H = 1080;

function sh(cmd) {
  return new Promise((res, rej) => {
    const p = spawn('bash', ['-c', cmd], { stdio: ['ignore', 'inherit', 'inherit'] });
    p.on('close', c => c === 0 ? res() : rej(new Error('exit ' + c)));
  });
}

(async () => {
  const dir = path.join('/tmp/claude-0', 'jpg_' + path.basename(OUT).replace(/\W/g,'_'));
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--force-color-profile=srgb']
  });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
  await page.goto('file://' + path.resolve(HTML));
  await page.addStyleTag({ content: `html,body{background:${BG} !important;}` });
  await page.waitForFunction('window.__ready === true');

  const total = Math.round(DURATION_MS / 1000 * FPS);
  const t0 = Date.now();
  for (let f = 0; f < total; f++) {
    await page.evaluate(t => window.seek(t), f * (1000 / FPS));
    await page.screenshot({ path: path.join(dir, `f${String(f).padStart(5,'0')}.jpg`), type: 'jpeg', quality: 95 });
    if (f % 60 === 0) console.log('captured', f, '/', total, ((Date.now()-t0)/1000).toFixed(1)+'s');
  }
  await browser.close();
  console.log('capture done — encoding...');

  await sh(`cat ${dir}/f*.jpg | ${FFMPEG} -y -f image2pipe -c:v mjpeg -framerate ${FPS} -i pipe:0 ` +
           `-c:v libvpx -b:v 10M -crf 8 -auto-alt-ref 0 ${OUT}`);
  console.log('DONE', OUT);
})().catch(e => { console.error(e); process.exit(1); });
