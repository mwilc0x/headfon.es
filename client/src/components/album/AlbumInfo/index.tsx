import * as React from 'react';
import './style.css';
import { ImageLoader } from '../../';
import { getYear } from '../../../helpers';
import { playAlbum } from '../../../store';
import { navigate } from '@reach/router';

interface Props {
  album: Album;
}

function AlbumInfo(props: Props) {
  const { album } = props;
  const {
    artists: [{ name: artistName }],
    images: [{ url: albumUrl }],
    name,
    release_date,
    tracks,
  } = album;
  const tracksLength =
    tracks.items && tracks.items.length
      ? ` • ${tracks.items.length} Songs`
      : '';

  function handlePlayAlbum() {
    const { album } = props;
    playAlbum(album);
  }
  function goToArtist() {
    const { album } = props;
    const {
      artists: [{ id }],
    } = album;
    navigate(`/artist/${id}`);
  }

  return (
    <>
      <ImageLoader className="album-cover" src={albumUrl} />
      <span className="album-name">{name}</span>
      <span className="album-artist" onClick={goToArtist}>
        {artistName}
      </span>
      <span className="album-year">
        {getYear(release_date)}
        {tracksLength}
      </span>
      <button onClick={handlePlayAlbum}>Play Album</button>
    </>
  );
}

export default AlbumInfo;
