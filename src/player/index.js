import { canvas } from "../canvas";
import Bullet from "../bullet";

export default class Player {
  x = 0;
  y = 30;
  width = 30;
  height = 50;
  isShot = false;

  constructor() {
    this.x = canvas.width / 2 - this.width / 2;
  }

  drawPlayer(ctx) {
    ctx.fillStyle = 'black';

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  drawShield(ctx) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(149, 213, 255, 0.24)';
    ctx.strokeStyle = 'rgba(0, 153, 255, 0.55)';
    ctx.arc(this.x + this.width / 2, this.y, 75, 0, Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  }

  draw(ctx) {
    this.drawPlayer(ctx);
    this.drawShield(ctx);
  }

  shoot(ctx, enemy) {
    if (this.isShot) {
      return;
    }

    const bullet = new Bullet();

    this.isShot = true;
    bullet.spawn(this.x + this.width / 2, this.y + this.height, enemy);

    return bullet;
  }
}