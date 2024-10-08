import AssetsLoader from "../assets-loader";

export default class Boom {
  x = 0;
  y = 0;
  images = [];
  curAnim = 0;
  maxAnim = 16;
  al = null;
  timeBetweenFrames = 30;
  frames = 0;

  constructor() {
    this.al = AssetsLoader;
  }

  make(x, y) {
    if (!this.images.length) {
      this.images = this.al.boomAssets;
    }

    this.x = x;
    this.y = y;
  }

  draw(ctx, dt) {
    this.frames += dt;

    if (this.frames < this.timeBetweenFrames) {
      return;
    }

    if (this.curAnim >= this.maxAnim) {
      return;
    }

    ctx.drawImage(this.images[this.curAnim], this.x - 25, this.y, 50, 50);

    this.frames = 0;

    this.curAnim++;
  }
}