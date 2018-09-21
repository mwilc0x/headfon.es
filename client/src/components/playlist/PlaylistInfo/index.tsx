import * as React from 'react';
import './style.css';
import { ImageLoader } from '../../';
import { playAlbum } from '../../../store';

interface Props {
  playlist: Playlist;
}

class PlaylistInfo extends React.PureComponent<Props, {}> {
  public render() {
    const { playlist } = this.props;
    const {
      images: [{ url: playlistUrl }],
      name,
    } = playlist;

    return (
      <>
        <ImageLoader className="playlist-cover" src={playlistUrl} />
        <span className="playlist-name">{name}</span>
        <button onClick={this.playPlaylist}>Play Playlist</button>
      </>
    );
  }
  private playPlaylist = () => {
    const { playlist } = this.props;
    playAlbum(playlist);
  };
}

export default PlaylistInfo;
