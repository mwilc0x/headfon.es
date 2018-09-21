import * as React from 'react';
import { navigate } from '@reach/router';
import { PlayButton } from 'react-player-controls';
import { ImageLoader } from '../../';
import { playAlbum, resetPlaylistViewing } from '../../../store';
import './style.css';

interface Props {
  playlist: Playlist;
}

interface State {
  showPlayIcon: boolean;
}

class PlaylistListing extends React.PureComponent<Props, State> {
  public state = { showPlayIcon: false };
  public render() {
    const { playlist } = this.props;
    const { showPlayIcon } = this.state;

    const { images, name } = playlist;
    return (
      <div className="playlist-listing">
        <div
          className="playlist-listing__wrapper"
          onClick={this.navigateToPlaylist}
          onMouseEnter={this.handleOnMouseEnter}
          onMouseLeave={this.handleOnMouseLeave}
        >
          {showPlayIcon ? (
            <PlayButton isEnabled={true} onClick={this.handlePlaylistPlay} />
          ) : null}
          <ImageLoader src={images[0].url} />
        </div>

        <p>{name}</p>
      </div>
    );
  }
  private navigateToPlaylist = () => {
    const { playlist } = this.props;
    const { id, owner = { id: '' } } = playlist;
    resetPlaylistViewing();
    navigate(`/playlist/${owner.id}/${id}`);
  };
  private handlePlaylistPlay = e => {
    e.stopPropagation();
    const { playlist } = this.props;
    playAlbum(playlist);
  };
  private handleOnMouseEnter = e => {
    this.setState({
      showPlayIcon: true,
    });
  };
  private handleOnMouseLeave = e => {
    this.setState({
      showPlayIcon: false,
    });
  };
}

export default PlaylistListing;
