import albumsResponse from '../mocks/albums.json';

export function getAlbums() {
  const albums: AlbumData[] = albumsResponse;

  return albums;
}
