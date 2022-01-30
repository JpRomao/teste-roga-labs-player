import { Album } from './Album';
import { Playlist } from './Playlist';

export class Player implements PlayerType {
  constructor() {
    this.playlist = new Playlist();
    this.album = new Album({} as AlbumData);
    this.playing = false;
    this.trackUrl = '';
    this.albumIndex = 0;
    this.trackIndex = 0;
  }

  album: AlbumType | null;
  playing: boolean;
  playlist: PlaylistType;
  trackUrl: string | null;

  albumIndex: number;
  trackIndex: number;

  play(): void {
    this.album = this.playlist.albums[this.albumIndex];
    this.trackUrl = this.album?.getUrlFromIndex(this.trackIndex) || '';

    this.playing = true;
  }

  pause(): void {
    this.playing = false;
  }

  nextTrack(): void {
    if (this.album?.isLastTrack(this.trackIndex)) {
      if (this.playlist.isLastAlbum(this.albumIndex)) {
        this.albumIndex = 0;
      } else {
        this.albumIndex++;
      }

      this.album = this.playlist.albums[this.albumIndex];
      this.trackIndex = 0;
    } else {
      this.trackIndex++;
    }

    this.album = this.playlist.albums[this.albumIndex];
    this.trackUrl = this.album?.getUrlFromIndex(this.trackIndex) || '';
  }

  prevTrack(): void {
    if (this.album?.isFirstTrack(this.trackIndex)) {
      if (this.playlist.isFirstAlbum(this.albumIndex)) {
        this.albumIndex = this.playlist.albums.length - 1;
      } else {
        this.albumIndex--;
      }

      this.album = this.playlist.albums[this.albumIndex];
      this.trackIndex = this.album.tracks.length - 1;
    } else {
      this.trackIndex--;
    }

    this.album = this.playlist.albums[this.albumIndex];
    this.trackUrl = this.album?.getUrlFromIndex(this.trackIndex) || '';
  }
}
