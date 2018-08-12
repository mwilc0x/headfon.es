import * as React from 'react';
import { playTrack } from '../../../store';
import { millisToMinutesAndSeconds } from '../../../helpers';
import './style.css';

class Track extends React.Component<any, any> {
  public render() {
    const { key, track } = this.props;
    return (
      <li className="track" key={key} onClick={this.handlePlay}>
        <span>{track.name}</span>
        <span>{millisToMinutesAndSeconds(track.duration_ms)}</span>
      </li>
    )
  }
  private handlePlay = () => {
    playTrack(this.props.track);
  }
}

export default Track;
