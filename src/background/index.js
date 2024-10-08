import { randomBetween } from '../utils';
import { canvas } from '../canvas';

let dunesGenerated = false;
let sunGenerated = false;
const dunesCache = {
  dune1: {},
  dune2: {},
  dune3: {},
};
const sunCache = {};

const backgrounds = {
  dune1: 'rgb(81, 38, 0)',
  dune2: 'rgb(131, 59, 30)',
  dune3: 'rgb(187, 81, 4)',
};

const generateDune = (minY, maxY, color, step, dune) => {
  dune.firstY = randomBetween(minY, maxY);
  dune.color = color;
  dune.step = step;
  dune.loop = {};

  let y = 0;
  for (let i = 0; i < canvas.width / step; i++) {
    y = randomBetween(minY, maxY);
    dune.loop[i] = { y };
  }

  return dune;
};

const drawDune = (ctx, dune) => {
  ctx.beginPath();
  ctx.fillStyle = dune.color;
  ctx.strokeStyle = dune.color;
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // let firstY = randomBetween(minY, maxY);
  let firstY = dune.firstY;
  let y = 0;

  for (let i = 0; i < canvas.width / dune.step; i++) {
    y = dune.loop[i].y;
    // y = randomBetween(minY, maxY);
    ctx.lineTo(Math.min(dune.step * i + dune.step, canvas.width), y);
  }

  ctx.lineTo(canvas.width, 0);
  ctx.lineTo(0, 0);
  ctx.lineTo(0, firstY);

  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};

const drawDunes = (ctx) => {
  if (!dunesGenerated) {
    const step1 = randomBetween(600, 800);
    const step2 = randomBetween(500, 600);
    const step3 = randomBetween(300, 400);
  
    generateDune(260, 290, backgrounds.dune3, step3, dunesCache.dune1);
    generateDune(160, 200, backgrounds.dune2, step2, dunesCache.dune2);
    generateDune(50, 150, backgrounds.dune1, step1, dunesCache.dune3);

    dunesGenerated = true;
  }

  drawDune(ctx, dunesCache.dune1);
  drawDune(ctx, dunesCache.dune2);
  drawDune(ctx, dunesCache.dune3);
};

const drawGradientBackground = (ctx) => {
  const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
  gradient.addColorStop(0, 'rgb(237, 24, 8)');
  gradient.addColorStop(1, 'rgb(255, 96, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawSun = (ctx) => {
  if (!sunGenerated) {
    sunCache.x = randomBetween(0, canvas.width);
    sunCache.y = randomBetween(290, canvas.height - 300);

    sunGenerated = true;
  }

  ctx.beginPath();
  ctx.fillStyle = 'rgb(250, 251, 71)';
  ctx.strokeStyle = 'rgb(250, 251, 71)';
  ctx.arc(sunCache.x, sunCache.y, 150, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
};

export const drawBackground = (ctx) => {
  drawGradientBackground(ctx);

  drawSun(ctx);

  drawDunes(ctx);
};
