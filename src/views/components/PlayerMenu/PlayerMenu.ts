import { Player } from '~/models/Player';
import { html, mounted } from '~/utils';
import { pauseMusic, playMusic } from '~/utils/audio';

import './PlayerMenu.css';

export function PlayerMenu(playerMenu: Player, audio: HTMLAudioElement) {
  mounted(function () {
    const playButton = document.getElementById('playButton');
    const previousButton = document.getElementById('previousButton');
    const nextButton = document.getElementById('nextButton');

    previousButton?.addEventListener('click', function () {
      playerMenu.prevTrack();

      playMusic(audio, playerMenu);
    });

    nextButton?.addEventListener('click', function () {
      playerMenu.nextTrack();

      playMusic(audio, playerMenu);
    });

    playButton?.addEventListener('click', function () {
      if (audio.src && playerMenu.playing) {
        pauseMusic(audio, playerMenu);
      } else if (audio.src && !playerMenu.playing) {
        playMusic(audio, playerMenu);
      }
    });
  });

  return html`
    <div class="playerMenu">
      <div id="playingMusicMenu">
        <p></p>

        <div id="progressBar">
          <div id="musicLoadBar"></div>
        </div>
      </div>

      <div class="menuOptions">
        <button class="menuButton" id="previousButton">
          <img src="/img/prev.svg" width="32px" height="32px" />
        </button>

        <button class="menuButton" id="playButton">
          <img src="/img/play.svg" width="59px" height="75px" />
        </button>

        <button class="menuButton" id="nextButton">
          <img src="/img/next.svg" width="32px" height="32px" />
        </button>
      </div>
    </div>
  `;
}
