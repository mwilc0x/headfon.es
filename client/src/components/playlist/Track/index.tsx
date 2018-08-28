import * as React from 'react';
import { playTrack } from '../../../store';
import { millisToMinutesAndSeconds } from '../../../helpers';
import './style.css';

interface Props {
  isPlaying: boolean;
  track: Track;
}

class PlaylistTrack extends React.PureComponent<Props, {}> {
  public render() {
    const { isPlaying, track } = this.props;
    return (
      <li className={`playlist-track ${isPlaying ? 'playing' : ''}`} onClick={this.handlePlay}>
        <span>{track.name}</span>
        <span>{millisToMinutesAndSeconds(track.duration_ms)}</span>
      </li>
    )
  }
  private handlePlay = () => {
    playTrack(this.props.track);
  }
}

export default PlaylistTrack;
