import * as React from 'react';
import Controls from './';

export interface PlayerControls {
  nextTrack: () => void,
  pause: () => void,
  previousTrack: () => void,
  resume: () => void
}

interface Props {
  controls: PlayerControls,
  handleTrackClick: () => void,
  trackDetails: any
};

export function PlayerControlsContainer(props: Props) {
  let [trackProgress, setTrackProgress] = React.useState(0);
  let progressCounter;

  const prevSongRef = React.useRef(props);

  React.useEffect(() => {
    const previousSong = prevSongRef.current.trackDetails.track_window.current_track.uri;
    const currentSong = props.trackDetails.track_window.current_track.uri;

    if (previousSong !== currentSong) {
      clearInterval(progressCounter);
      startTrackProgress();
    }

    prevSongRef.current = props;
  });

  function startTrackProgress() {
      setTrackProgress(0);
      progressCounter = setInterval(() => {
        setTrackProgress(++trackProgress);
      }, 1000);
  }
  const { controls, handleTrackClick, trackDetails } = props;
  const { context, duration, paused, track_window } = trackDetails;
  const { current_track, next_tracks, previous_tracks } = track_window;
  const { album, artists, name } = current_track;
  const { images: [albumImage] } = album;
  const { url } = albumImage;

  const { uri, metadata: { context_description} } = context;

  const playerContext = {
    context_description,
    duration: duration/1000,
    next_tracks,
    previous_tracks,
    trackProgress,
    uri
  };

  return (
    <footer className="now-playing-container">
      <div className="now-playing-bar">
        <div className="now-playing-bar-section left">
          <div className="now-playing" onClick={handleTrackClick}>
            { !!url && <img src={url} /> }

            <div className="track-info">
              <span className="track-info__name">{name}</span>
              <span className="track-info__artist">{artists[0].name}</span>
            </div>

          </div>
        </div>

        <div className="now-playing-bar-section middle">
          <Controls
            context={playerContext}
            controls={controls}
            paused={paused}
          />
        </div>

        <div className="now-playing-bar-section right" />
      </div>
    </footer>
  )
}
