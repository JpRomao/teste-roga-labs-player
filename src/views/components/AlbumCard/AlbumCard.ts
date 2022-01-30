import { mounted } from './../../../utils/mounted';
import { Album } from '~/models/Album';
import { Player } from '~/models/Player';
import { html } from '~/utils';

import './AlbumCard.css';
import { pauseImage } from '~/utils/constants';
import { playMusic } from '~/utils/audio';

export function AlbumCard(
  { artist, cover, title, tracks }: Album,
  playerMenu: Player,
  audio: HTMLAudioElement,
  albumIndex: number
) {
  mounted(function () {
    const musicItems =
      document.querySelectorAll<HTMLButtonElement>('.musicItem');
    const playButton = document.getElementById('playButton');

    musicItems?.forEach((musicItem) => {
      musicItem?.addEventListener('click', function () {
        playerMenu.playing = true;
        playerMenu.trackIndex = Number(musicItem.dataset.index) || 0;
        playerMenu.albumIndex = Number(musicItem.dataset.albumIndex) || 0;

        playMusic(audio, playerMenu);

        playButton!.innerHTML = pauseImage;
      });
    });
  });

  return html`
    <article class="cardContainer" id="album-${albumIndex}">
      <div class="cardHeader">
        <img src="${cover}" />

        <div>
          <h3>${title}</h3>
          <p>${artist}</p>
        </div>
      </div>

      <div class="cardBody">
        ${tracks
          .map((track, index) => {
            return `
              <button
                class="musicItem"
                id="track-${index}"
                data-album-index="${albumIndex}"
                data-index="${index}"
              >
                ${index < 10 && '0'}${index + 1}. ${track.title}
              </button>
            `;
          })
          .join('')}
      </div>
    </article>
  `;
}
