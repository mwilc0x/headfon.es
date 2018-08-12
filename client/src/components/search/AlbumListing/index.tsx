import * as React from 'react';
import { navigate } from '@reach/router';
import { resetAlbumViewing } from '../../../store';
import './style.css';

interface Props {
  album: any;
  key: number;
}

class AlbumListing extends React.Component<Props, {}> {
  public render() {
    const { album, key } = this.props;
    const { images } = album;
    return (
      <div className="album-listing" key={key} onClick={this.handleAlbumSelection}>
        <img src={images[0].url} />
      </div>
    );
  }
  private handleAlbumSelection = () => {
    const { album } = this.props;
    const { id } = album;
    resetAlbumViewing();
    navigate(`/album/${id}`);
  }
}

export default AlbumListing;
