import boom1 from '../../assets/boom-1.png';
import boom2 from '../../assets/boom-2.png';
import boom3 from '../../assets/boom-3.png';
import boom4 from '../../assets/boom-4.png';
import boom5 from '../../assets/boom-5.png';
import boom6 from '../../assets/boom-6.png';
import boom7 from '../../assets/boom-7.png';
import boom8 from '../../assets/boom-8.png';
import boom9 from '../../assets/boom-9.png';
import boom10 from '../../assets/boom-10.png';
import boom11 from '../../assets/boom-11.png';
import boom12 from '../../assets/boom-12.png';
import boom13 from '../../assets/boom-13.png';
import boom14 from '../../assets/boom-14.png';
import boom15 from '../../assets/boom-15.png';
import boom16 from '../../assets/boom-16.png';
import boom17 from '../../assets/boom-17.png';

const boomImgs = [
  boom1,
  boom2,
  boom3,
  boom4,
  boom5,
  boom6,
  boom7,
  boom8,
  boom9,
  boom10,
  boom11,
  boom12,
  boom13,
  boom14,
  boom15,
  boom16,
  boom17,
];

export default new class AssetsLoader {
  boomAssets = [];
  musicPlaying = false;
  boomAssetsLoadingProgress = 0;
  boomAssetsTotal = boomImgs.length;

  load() {
    this.loadBoom();
    this.loadMusic();
  }

  loadBoom() {
    for (let i = 0; i < boomImgs.length; i++) {
      const url = boomImgs[i];
      const img = new Image();

      img.onload = () => {
        this.boomAssets[i] = img;
        this.boomAssetsLoadingProgress++;

        if (this.boomAssetsLoadingProgress === this.boomAssetsTotal - 1) {
          console.log(`All assets loaded`)
        }
      };

      img.onerror = (err) => console.log(err);

      img.src = url;
    }
  }

  loadMusic() {
    const url = new URL('../../music/menu-music.mp3', import.meta.url);
    const menuMusicAudio = new Audio(url);
    const menuMusicElement = document.getElementById('music');

    menuMusicAudio.loop = true;

    menuMusicElement.addEventListener('click', () => {
      if (this.musicPlaying) {
        menuMusicAudio.pause();
        menuMusicAudio.currentTime = 0;
        menuMusicElement.innerHTML = 'Music OFF';
        this.musicPlaying = false;
        return;
      }

      menuMusicAudio.play();
      menuMusicElement.innerHTML = 'Music ON';
      this.musicPlaying = true;
    });
  }
}
