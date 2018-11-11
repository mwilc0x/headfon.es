import * as React from 'react';
import { playTrack } from '../../../store';
import { millisToMinutesAndSeconds } from '../../../helpers';
import './style.css';

interface Props {
  isPlaying: boolean;
  track: Track;
}

function Track(props: Props) {
  const { isPlaying, track } = props;

  function handlePlay() {
    playTrack(track);
  }

  return (
    <li className={`album-track ${isPlaying ? 'playing' : ''}`} onClick={handlePlay}>
      <span>{track.name}</span>
      <span>{millisToMinutesAndSeconds(track.duration_ms)}</span>
    </li>
  )
}

export default Track;
