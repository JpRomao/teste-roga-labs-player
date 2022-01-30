import { Player } from '~/models/Player';
import { pauseImage, playImage } from '~/utils/constants';

export function playMusic(audio: HTMLAudioElement, player: Player) {
  const playingMusic = document.querySelector('#playingMusicMenu p');
  const playButton = document.getElementById('playButton');

  const selectedTrack = document.querySelector(
    `#album-${player.albumIndex} #track-${player.trackIndex}`
  );
  const activeMusic = document.querySelector('.activeMusic');

  player.play();

  if (player.playing) {
    if (selectedTrack) {
      if (activeMusic) {
        activeMusic.classList.remove('activeMusic');
      }

      selectedTrack.classList.add('activeMusic');
    }
  }

  if (player.trackUrl && player.trackUrl !== audio.src) {
    audio.src = player.trackUrl;
  }

  audio.play();

  playingMusic!.innerHTML = `${player.album?.artist} - ${
    player.album?.tracks[player.trackIndex].title
  }`;

  playButton!.innerHTML = pauseImage;
}

export function pauseMusic(audio: HTMLAudioElement, player: Player) {
  if (audio.src && player.playing) {
    player.pause();

    audio.pause();

    const playButton = document.getElementById('playButton');

    playButton!.innerHTML = playImage;
  }
}
