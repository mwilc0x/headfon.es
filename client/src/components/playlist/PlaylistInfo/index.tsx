import * as React from 'react';
import './style.css';
import { ImageLoader } from '../../';
import { playAlbum } from '../../../store';

interface Props {
  playlist: Playlist;
}

function PlaylistInfo(props: Props) {
  const { playlist } = props;
  function playPlaylist() {
    playAlbum(playlist);
  }

  const {
    images: [{ url: playlistUrl }],
    name,
  } = playlist;

  return (
    <>
      <ImageLoader className="playlist-cover" src={playlistUrl} />
      <span className="playlist-name">{name}</span>
      <button onClick={playPlaylist}>Play Playlist</button>
    </>
  );

}

export default PlaylistInfo;
