import * as React from 'react';
import { navigate } from '@reach/router';
import { PlayButton } from 'react-player-controls';
import { playAlbum } from '../../../store';
import './style.css';

interface Props {
  playlist: Playlist;
}

interface State {
  showPlayIcon: boolean
}

class PlaylistListing extends React.PureComponent<Props, State> {
  public state = { showPlayIcon: false };
  public render() {
    const { playlist } = this.props;
    const { showPlayIcon } = this.state;

    const { images, name } = playlist;
    return (
      <div 
        className="playlist-listing"
        onClick={this.navigateToPlaylist}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
      >
        { showPlayIcon 
          ? ( <PlayButton 
                isEnabled={true} 
                onClick={this.handlePlaylistPlay} 
              /> 
            ) 
          : null 
        }
        <img src={images[0].url} />
        <span>{name}</span>
      </div>
    );
  }
  private navigateToPlaylist = () => {
    const { playlist } = this.props;
    const { id } = playlist;
    // resetAlbumViewing();
    navigate(`/playlist/${id}`);
  }
  private handlePlaylistPlay = (e) => {
    e.stopPropagation();
    const { playlist } = this.props;
    playAlbum(playlist);
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

export default PlaylistListing;
