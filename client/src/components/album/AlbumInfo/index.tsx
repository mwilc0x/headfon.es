import * as React from 'react';
import './style.css';
import { getYear } from '../../../helpers';
import { playAlbum } from '../../../store';
import { navigate } from '@reach/router';

interface Props {
  album: Album
}

class AlbumInfo extends React.PureComponent<Props, {}> {
  public render() {
    const { album } = this.props;
    const { artists: [{ name: artistName }], images: [{ url: albumUrl }], name, release_date, tracks } = album;
    const tracksLength = tracks.items && tracks.items.length ? ` • ${tracks.items.length} Songs` : '';

    return (
      <>
        <img className="album-cover" src={albumUrl} />
        <span className="album-name">{name}</span>
        <span className="album-artist" onClick={this.goToArtist}>{artistName}</span>
        <span className="album-year">{getYear(release_date)}{tracksLength}</span>
        <button onClick={this.playAlbum}>Play Album</button>
      </>
    )
  }
  private playAlbum = () => {
    const { album } = this.props;
    playAlbum(album);
  }
  private goToArtist = () => {
    const { album } = this.props;
    const { artists: [{ id }] } = album;
    navigate(`/artist/${id}`);
  }
}

export default AlbumInfo;
