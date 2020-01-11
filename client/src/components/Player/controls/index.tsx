import * as React from 'react';
import { PlayerIcon } from 'react-player-controls';
import { PlayerControls } from './container';
import './style.css';

interface PlayerContext {
  context_description: string;
  duration: number;
  next_tracks: any[];
  previous_tracks: any[];
  trackProgress: number;
  uri: string;
}

interface Props {
  context: PlayerContext;
  controls: PlayerControls;
  paused: boolean;
}

function Controls(props: Props) {
  const { context, controls, paused } = props;
  const {
    // duration,
    next_tracks = [],
    previous_tracks = [],
    // trackProgress,
    uri,
  } = context;

  return (
    <div className="player-controls-container">
      <div className="player-controls">
        <PlayerIcon.Previous
          isEnabled={!!previous_tracks.length && !!uri}
          onClick={controls.previousTrack}
        />

        {paused ? (
          <PlayerIcon.Play isEnabled={true} onClick={controls.resume} />
        ) : (
          <PlayerIcon.Pause onClick={controls.pause} />
        )}

        <PlayerIcon.Next
          isEnabled={!!next_tracks.length && !!uri}
          onClick={controls.nextTrack}
        />
      </div>
    </div>
  );
}

export default Controls;
