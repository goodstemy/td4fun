import { lenOfVec } from "../utils";

export default class Bullet {
  damage = 1;
  x = 0;
  y = 0;
  width = 5;
  height = 5;
  speed = 1;
  speed = 0.25;
  enemy = null;
  deleted = false;

  constructor() {
  }

  getEnemyX() {
    return this.enemy.x;
  }

  getEnemyY() {
    return this.enemy.y;
  }

  spawn(x, y, enemy) {
    if (!this.enemy)
      this.enemy = enemy;

    this.x = x + enemy.width / 2;
    this.y = y - enemy.height / 2;
  }

  draw(ctx, dt) {
    if (this.deleted) return;

    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    const L = lenOfVec(this.enemy.x, this.x, this.enemy.y, this.y);
    let dirX = this.enemy.x - this.x;
    let dirY = this.enemy.y - this.y;

    if (L != 0) {
      dirX /= L;
      dirY /= L;
    }

    this.x += dirX * this.speed * dt;
    this.y += dirY * this.speed * dt;
  }

  destroy() {
    this.deleted = true;
  }
}