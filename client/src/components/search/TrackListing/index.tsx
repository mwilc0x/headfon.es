import * as React from 'react';
import { playTrack } from '../../../store';
import { millisToMinutesAndSeconds } from '../../../helpers/time';
import './style.css';

interface Props {
  track: any
}

export default class TrackListing extends React.Component<Props, {}> {
  public static defaultProps = { track: {} }
  public render() {
    const { track } = this.props;
    const { 
      album: { name: albumName },
      artists: [{ name: artistName }],
      duration_ms,
      name
    } = track;

    return (
      <div className="track-listing" onClick={this.handlePlayingTrack}>
        <div className="track-info">
          <span className="track-info__name">{name}</span>
          <span className="track-info__artist">
            {`${artistName} • ${albumName}`}
          </span>
        </div>
        <span>{millisToMinutesAndSeconds(duration_ms)}</span>
      </div>
    )
  }
  private handlePlayingTrack = () => {
    playTrack(this.props.track);
  }
}
