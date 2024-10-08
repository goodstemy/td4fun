import { canvas } from "../canvas";
import { play, settings } from "./menu";
import { menu } from "./menu";
import ee from "../ee";

const levels = {
  menu: 0,
  game: 1,
};

export default class {
  cur = 0;

  constructor() {
    play.addEventListener('click', () => {
      this.showGame();

      ee.dispatchEvent(new Event('game_play'));
    });
  }

  showMainMenu() {
    canvas.style.display = 'none';
    menu.style.display = 'inline-block';
  }

  showGame() {
    canvas.style.display = 'inline-block';
    menu.style.display = 'none';
  }
} 