import { canvas } from '../canvas';
import { lenOfVec, randomBetween } from '../utils';

export default class Enemy {
  health = 3;
  color = 'black';
  x = 0;
  y = 30;
  width = 15;
  height = 15;
  speed = 0.03;
  targetX = 0;
  targetY = 0;
  deleted = false;

  constructor() {
  }

  spawn(x, y) {
    this.targetX = x;
    this.targetY = y;

    if (randomBetween(1, 2) === 1) {
      this.x = 0 - this.width;
    } else {
      this.x = canvas.width + this.width;
    }
  }

  update() {
    switch(this.health) {
      case 1:
        this.color = 'red';
        break;
      case 2:
        this.color = 'yellow';
        break;
      case 3:
      default:
        this.color = 'black';
    }
  }

  draw(ctx, dt) {
    if (this.deleted) return;

    this.update();

    ctx.fillStyle = this.color;

    this.x = this.x + (this.targetX - this.x) / lenOfVec(this.targetX, this.x, this.targetY, this.y) * this.speed * dt;
    
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  takeDamage(damage) {
    this.health -= damage;

    if (this.health <= 0) {
      this.destroy();
    } 
  }

  destroy() {
    this.deleted = true;
  }
}
