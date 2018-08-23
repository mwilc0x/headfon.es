import * as React from 'react';
import Controls from './';

interface PlayerControlsProps {
  controls: any,
  handleTrackClick: () => void,
  trackDetails: any
};

interface PlayerControlsState {
  trackProgress: number
};

export class PlayerControlsContainer extends React.Component<PlayerControlsProps, PlayerControlsState> {
  public state = { trackProgress: 0 };
  public progressCounter;
  public componentDidUpdate(prevProps) {
    // logic:
    // 1: no song playing before and now song playing?
    // 2: different song playing?
    // 3: same song playing? 

    const previousSong = prevProps.trackDetails.track_window.current_track.uri;
    const currentSong = this.props.trackDetails.track_window.current_track.uri;

    if (previousSong !== currentSong) {
      clearInterval(this.progressCounter);
      this.startTrackProgress();
    }
  }
  public render() {
    const { controls, handleTrackClick, trackDetails } = this.props;
    const { context, duration, paused, track_window } = trackDetails;
    const { current_track, next_tracks, previous_tracks } = track_window;
    const { album, artists, name } = current_track;
    const { images: [albumImage] } = album;
    const { url } = albumImage;
  
    const { uri, metadata: { context_description} } = context;
    const { trackProgress } = this.state;

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
  private startTrackProgress = () => {
    this.setState({ trackProgress: 0 }, () => {
      this.progressCounter = setInterval(() => {
        this.setState(({ trackProgress }) => ({ trackProgress: trackProgress + 1 }))
      }, 1000);
    });
  }
}
