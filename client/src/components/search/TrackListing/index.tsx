import * as React from 'react';
import { playTrack } from '../../../store';
import { millisToMinutesAndSeconds } from '../../../helpers/time';
import './style.css';

interface Props {
  track: Track
}

function TrackListing(props: Props) {
  const { track } = props;

  function handlePlayingTrack() {
    playTrack(track);
  }

  const { 
    album: { name: albumName },
    artists: [{ name: artistName }],
    duration_ms,
    name
  } = track;

  return (
    <div className="track-listing" onClick={handlePlayingTrack}>
      <div className="track-info">
        <span className="track-info__name">{name}</span>
        <span className="track-info__artist">
          {`${artistName} • ${albumName}`}
        </span>
      </div>
      <span>{millisToMinutesAndSeconds(duration_ms)}</span>
    </div>
  );
}

TrackListing.defaultProps = { track: {} };

export default TrackListing;
