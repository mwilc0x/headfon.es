import * as React from 'react';
import './style.css';
import { getYear } from '../../../helpers';
import { playAlbum } from '../../../store';

interface Props {
  album: any
}

class AlbumInfo extends React.Component<Props, {}> {
  public render() {
    const { album } = this.props;
    const { artists: [{ name: artistName }], images: [{ url: albumUrl }], name, release_date, tracks } = album;
    const tracksLength = tracks.items && tracks.items.length ? ` • ${tracks.items.length} Songs` : '';

    return (
      <>
        <img className="album-cover" src={albumUrl} />
        <span className="album-name">{name}</span>
        <span className="album-artist">{artistName}</span>
        <span className="album-year">{getYear(release_date)}{tracksLength}</span>
        <button onClick={this.playAlbum}>Play Album</button>
      </>
    )
  }
  private playAlbum = () => {
    const { album } = this.props;
    playAlbum(album);
  }
}

export default AlbumInfo;
