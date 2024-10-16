import Scenes from './scenes';
import ee from './ee';
import { drawBackground } from './background';
import Player from './player';
import Enemy from './enemy';
import Bullet from './bullet';
import Boom from './boom';
import AssetsLoader from './assets-loader';

const resize = (ctx) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.setAttribute(
    'style',
    'position: absolute; top: 0; left: 0; z-index: -1;' +
      'image-rendering: optimizeSpeed;' +
      'image-rendering: pixelated;' +
      'image-rendering: -moz-crisp-edges;',
  );
  ctx.transform(1, 0, 0, -1, 0, canvas.height);
};

class Core {
  scenes;
  ts;
  player;
  maxEnemies = 2;
  canShoot = false;
  shootInterval = null;
  shootIntervalPause = 2000;

  bullets = [];
  enemies = [];
  explosions = [];

  constructor() {}

  init() {
    AssetsLoader.load();

    this.scenes = new Scenes();

    const ctx = canvas.getContext('2d');
    resize(ctx);
    this.player = new Player();

    ee.addEventListener('game_play', () => {
      this.ts = +new Date();

      requestAnimationFrame(() => {
        this.loop(ctx);
      });
    });

    this.shootInterval = setTimeout(() => {
      this.canShoot = true;
      clearInterval(this.shootInterval);
    }, this.shootIntervalPause);
  }

  loop(ctx) {
    const now = +new Date();
    const dt = now - this.ts;

    this.draw(ctx, dt);

    this.ts = now;

    requestAnimationFrame(() => this.loop(ctx));
  }

  draw(ctx, dt) {
    drawBackground(ctx);

    this.player.draw(ctx);

    if (this.enemies.length < this.maxEnemies) {
      const enemy = new Enemy();

      enemy.spawn(this.player.x, this.player.y);

      this.enemies.push(enemy);
    }

    if (this.canShoot) {
      const bullet = new Bullet();

      bullet.spawn(
        this.player.x,
        this.player.y + this.player.height,
        this.enemies[0],
      );

      this.bullets.push(bullet);

      this.canShoot = false;
      this.shootInterval = setTimeout(() => {
        this.canShoot = true;
        clearInterval(this.shootInterval);
      }, this.shootIntervalPause);
    }

    for (const enemy of this.enemies) {
      enemy.draw(ctx, dt);
    }

    for (const bullet of this.bullets) {
      bullet.draw(ctx, dt);
    }

    for (const explosion of this.explosions) {
      explosion.draw(ctx, dt);
    }

    this.checkColissions();
    this.removeDeleted();
  }

  checkColissions() {
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];

      const bulletX = bullet.x;
      const bulletY = bullet.y;
      const enemy = bullet.enemy;
      const damage = bullet.damage;
      const D = Math.sqrt(Math.pow(enemy.x - bullet.x, 2) + Math.pow(enemy.y - bullet.y, 2));

      if (D < 10) {
        const boom = new Boom();

        boom.make(bulletX, bulletY);
        bullet.destroy();
        enemy.takeDamage(damage);

        this.explosions.push(boom);
      }
    }
  }

  removeDeleted() {
    const b = [];
    const e = [];

    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];

      if (!bullet.deleted) {
        b.push(bullet);
      }
    }

    
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];

      if (!enemy.deleted) {
        e.push(enemy);
      }
    }

    this.bullets = [...b];
    this.enemies = [...e];
  }
}

const core = new Core();

window.onload = core.init.bind(core);
