export class Album implements AlbumType {
  constructor(album: AlbumData) {
    this.artist = album.artist;
    this.title = album.title;
    this.tracks = album.tracks;
    this.cover = album.cover;
  }

  artist: string;
  cover: string;
  title: string;
  tracks: TrackData[];

  getUrlFromIndex(index: number): string | null {
    if (this.tracks && this.tracks[index]) {
      return this.tracks[index].url;
    }

    return null;
  }

  isFirstTrack(index: number): boolean {
    return index === 0;
  }

  isLastTrack(index: number): boolean {
    return index === this.tracks.length - 1;
  }
}
