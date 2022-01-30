import { Album } from './Album';

export class Playlist implements PlaylistType {
  constructor() {
    this.albums = [];
  }

  albums: AlbumType[];

  addAlbum(data: AlbumData) {
    const album = new Album(data);

    this.albums.push(album);
  }

  isFirstAlbum(index: number): boolean {
    return index === 0;
  }

  isLastAlbum(index: number): boolean {
    return index === this.albums.length - 1;
  }
}
