import { pauseMusic, playMusic } from '~/utils/audio';
import { html, getAlbums } from '~/utils';
import { AlbumCard } from './components/AlbumCard/AlbumCard';
import { PlayerMenu } from './components/PlayerMenu/PlayerMenu';

import './App.css';
import { Playlist } from '~/models/Playlist';
import { Player } from '~/models/Player';

export function App() {
  const albums = getAlbums();
  const audio = new Audio();

  const playlist = new Playlist();

  albums.forEach((album) => {
    playlist.addAlbum(album);
  });

  const playerMenu = new Player();

  playerMenu.playlist = playlist;

  document.onkeyup = (event) => {
    if (event.key === ' ') {
      if (playerMenu.playing) {
        pauseMusic(audio, playerMenu);
      } else {
        playMusic(audio, playerMenu);
      }
    }
  };

  audio.onended = () => {
    playerMenu.nextTrack();
    playMusic(audio, playerMenu);
  };

  audio.ontimeupdate = () => {
    const musicLoadBar: HTMLProgressElement | null =
      document.querySelector<HTMLProgressElement>('#musicLoadBar');

    const min = 0;
    const max = audio.duration;
    const currentTime = audio.currentTime;

    if (musicLoadBar) {
      musicLoadBar.style.width = `${
        ((currentTime - min) / (max - min)) * 100
      }%`;
    }
  };

  return html`
    <div class="App">
      <main>
        <div class="albumsContainer">
          ${playlist.albums
            .map((album, index) => {
              return AlbumCard(album, playerMenu, audio, index);
            })
            .join('')}
        </div>

        ${PlayerMenu(playerMenu, audio)}
      </main>
    </div>
  `;
}
