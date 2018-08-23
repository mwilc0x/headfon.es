import * as React from 'react';
import {
  NextButton,
  PauseButton, 
  PlayButton,
  PrevButton,
  ProgressBar
} from 'react-player-controls';
import './style.css';

interface PlayerContext {
  context_description: string,
  duration: number,
  next_tracks: any[],
  previous_tracks: any[],
  trackProgress: number,
  uri: string
}

interface PlayerControls {
  nextTrack: () => {},
  pause: () => {},
  previousTrack: () => {},
  resume: () => {}
}

interface Props {
  context: PlayerContext,
  controls: PlayerControls,
  paused: boolean
}

class Controls extends React.Component<Props, {}> {
  public render() {
    const { context, controls, paused } = this.props;    
    const { duration, next_tracks = [], previous_tracks = [], trackProgress, uri } = context;

    return (
      <div className="player-controls-container">
        <div className="player-controls">
          <PrevButton 
            isEnabled={!!previous_tracks.length && !!uri}
            onClick={controls.previousTrack}
          />
          
          {
            paused 
              ? <PlayButton isEnabled={true} onClick={controls.resume} /> 
              : <PauseButton onClick={controls.pause} />
          }

          <NextButton
            isEnabled={!!next_tracks.length && !!uri}
            onClick={controls.nextTrack}
          />
        </div>

        <ProgressBar
          totalTime={duration}
          currentTime={trackProgress}
          isSeekable={false}
          // onSeek={() => { console.log('seek!')}}
        />
      </div>
    );
  }
}

export default Controls;
