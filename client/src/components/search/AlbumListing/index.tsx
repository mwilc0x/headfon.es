import * as React from 'react';
import { navigate } from '@reach/router';
import { PlayButton } from 'react-player-controls';
import { playAlbum, resetAlbumViewing } from '../../../store';
import './style.css';

interface Props {
  album: any;
  key: number;
}

interface State {
  showPlayIcon: boolean
}

class AlbumListing extends React.Component<Props, State> {
  public state = { showPlayIcon: false };
  public render() {
    const { album, key } = this.props;
    const { showPlayIcon } = this.state;

    const { images } = album;
    return (
      <div 
        className="album-listing" 
        key={key} 
        onClick={this.navigateToAlbum}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        { showPlayIcon 
          ? ( <PlayButton 
                isEnabled={true} 
                onClick={this.handleAlbumPlay} 
              /> 
            ) 
          : null 
        }
        <img src={images[0].url} />
      </div>
    );
  }
  private navigateToAlbum = () => {
    const { album } = this.props;
    const { id } = album;
    resetAlbumViewing();
    navigate(`/album/${id}`);
  }
  private handleAlbumPlay = (e) => {
    e.stopPropagation();
    const { album } = this.props;
    playAlbum(album);
  }
  private handleOnMouseEnter = (e) => {
    this.setState({
      showPlayIcon: true
    });
  }
  private handleOnMouseLeave = (e) => {
    this.setState({
      showPlayIcon: false
    });
  }
}

export default AlbumListing;
